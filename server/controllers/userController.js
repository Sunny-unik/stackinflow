const sendMail = require("../helpers/mailer");
const userSchema = require("../models/userSchema");
const upload = require("../helpers/multerConfig");
const fs = require("fs");
const { sign, verify } = require("jsonwebtoken");
const errorHandler = require("../helpers/ErrorHandler");
const bcrypt = require("bcrypt");
const { getOtp } = require("../helpers/otpManager");

const userController = {
  checkLogin: async (req, res) => {
    const checkPassword = async (user) => {
      if (await bcrypt.compare(req.body.password, user.password)) {
        user.password = undefined;
        const token = sign({ dname: user.dname }, "verySecretCode", {
          expiresIn: "7d"
        });
        return [user, token];
      }
    };

    await userSchema
      .findOne({
        $and: [
          { isVerifiedEmail: true },
          { $or: [{ email: req.body.email }, { dname: req.body.email }] }
        ]
      })
      .then(async (user) => {
        let filterData;
        if (!user) return res.send({ msg: "user not found" });
        else filterData = await checkPassword(user);
        filterData && filterData.length
          ? res
              .cookie("stackinflowToken", filterData[1], {
                sameSite: "strict",
                path: "/",
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true
              })
              .send({ data: filterData[0], msg: "Credentials Matched" })
          : res.send({ msg: "incorrect password" });
      })
      .catch((err) =>
        errorHandler(err, "UserController.checkLogin.findOne", res)
      );
  },

  logout: (req, res) => {
    res.clearCookie("stackinflowToken").send("token cleared");
  },

  authenticate: async (req, res) => {
    try {
      const token = req.cookies.stackinflowToken;
      if (!token) return res.send("cookie not found");
      const decode = verify(token, "verySecretCode");
      req.decoded = decode;
    } catch (error) {
      res.clearCookie("stackinflowToken").send("token expired");
      return false;
    }

    await userSchema
      .findOne({ dname: req.decoded.dname })
      .then((result) => {
        result.password = undefined;
        res.send({ status: "ok", data: result });
      })
      .catch((err) => res.send(err));
  },

  validEmail: (req, res) => {
    userSchema
      .findOne({
        $and: [{ email: req.body.email }, { isVerifiedEmail: true }]
      })
      .select("email")
      .then((result) => res.send(result ?? "valid email"))
      .catch((err) => res.send(err));
  },

  validDname: async (req, res) => {
    const userId = req.body?.id;
    let isDnameValid;
    await userSchema
      .findOne({
        $and: [
          { dname: req.body.dname },
          { _id: { $ne: userId } },
          { isVerifiedEmail: true }
        ]
      })
      .select("dname")
      .then((result) => {
        isDnameValid = result ?? "valid dname";
        res && res.send(isDnameValid);
      })
      .catch((err) => res && res.send(err));
    return isDnameValid === "valid dname" ? true : false;
  },

  removeUnverified: (req, res) => {
    userSchema
      .deleteMany({ isVerifiedEmail: false })
      .then((result) =>
        res.send({ data: result, message: "Unverified users removed" })
      )
      .catch((err) =>
        errorHandler(err, "UserController.removeUnverified", res)
      );
  },

  forgotPasswordEmail: (req, res) => {
    const otp = getOtp();
    userSchema
      .findOne({ $or: [{ email: req.body.email }, { dname: req.body.email }] })
      .select("_id email")
      .then((user) => {
        if (user) {
          userSchema
            .updateOne({ _id: user._id }, { $set: { otp: otp } })
            .then((data) => {
              if (!data.acknowledged) throw new Error("Unable to update Otp");
              sendMail(
                process.env.APP_ID,
                process.env.APP_PASSWORD,
                user.email,
                "Welcome to stackinflow",
                `<h1>Your One Time Password is: <b>${otp}</b></h1><br>
                <h3>We hope you find our service cool.</h3>`
              )
                .then(() =>
                  res.send({
                    data: user,
                    message: "Otp sent to your given email address"
                  })
                )
                .catch((error) =>
                  errorHandler(
                    error,
                    "userController.sendForgotOtp.sendMail",
                    res,
                    "Unable to sent email at given address please check your email, or try again later"
                  )
                );
            })
            .catch((error) =>
              errorHandler(error, "userController.sendForgotOtp.updateOne", res)
            );
        } else res.send({ data: null, message: "User not found" });
      })
      .catch((error) =>
        errorHandler(error, "userController.sendForgotOtp.findOne", res)
      );
  },

  checkOtp: (req, res) => {
    const { otp, _id } = req.body;
    userSchema
      .updateOne({ $and: [{ _id: _id }, { otp: otp }] }, { $unset: { otp: 1 } })
      .then((data) => {
        if (!data.acknowledged) throw new Error("Unable to update Otp");
        if (!data.modifiedCount)
          return res.status(400).send({ data, message: "! Incorrect Otp" });
        userSchema
          .updateOne({ _id: _id }, { $set: { isVerifiedEmail: true } })
          .then(() => res.send({ data, message: "Otp matched successfully" }));
      })
      .catch((error) => errorHandler(error, "UserController.checkOtp", res));
  },

  updateUserPoint: async (req, res) => {
    try {
      const result = await userSchema.updateOne(
        { _id: req.body.id },
        { $inc: { userlikes: 10 } }
      );
      const obj = {
        data: result,
        msg: result.modifiedCount ? "User points updated" : "not found"
      };
      return res ? res.send(obj) : obj;
    } catch (error) {
      if (!res) throw error;
      res.status(500).send(error);
    }
  },

  updateUserDetails: async (req, res) => {
    const validDname = await userController.validDname(req, undefined);
    if (!validDname)
      return res.send({ data: null, msg: "Entered username is already taken" });

    await userSchema
      .updateOne(
        { _id: req.body.id },
        {
          $set: {
            name: req.body.name,
            dname: req.body.dname,
            title: req.body.title,
            about: req.body.about,
            weblink: req.body.weblink,
            gitlink: req.body.gitlink,
            twitter: req.body.twitter,
            address: req.body.address
          }
        }
      )
      .then((result) => res.send({ data: result, msg: "Your details updated" }))
      .catch((err) => res.send(err));
  },

  updateUserProfile: (req, res) => {
    upload(req, res, (err) => {
      if (err) return res.send({ data: err, msg: "Profile update failed" });

      (async () => {
        await userSchema
          .updateOne(
            { _id: req.body.id },
            { $set: { profile: req.files.profile[0].filename } }
          )
          .then((result) => {
            res.send({ data: result, msg: "Profile Updated" });
            try {
              const oldProfile = req.body.oldProfile;
              fs.unlinkSync(
                `${__dirname}/../uploads/userProfiles/${oldProfile}`
              );
              console.log(oldProfile + " deleted successfully");
            } catch (error) {
              console.log("Old profile delete error: ", error);
            }
          })
          .catch((err) => res.send(err));
      })();
    });
  },

  updatePassword: async (req, res) => {
    await userSchema
      .updateOne(
        req.body.oldPassword
          ? {
              $and: [{ _id: req.body.id }, { password: req.body.oldPassword }]
            }
          : { _id: req.body.id },
        { $set: { password: req.body.newPassword } }
      )
      .then((result) =>
        res.send({
          data: result,
          msg: result.matchedCount
            ? "Your Password Updated Successfully"
            : "Old password is not correct"
        })
      )
      .catch((err) => res.send(err));
  },

  createUser: async (req, res) => {
    req.body.otp = getOtp();
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new userSchema(req.body);
    user
      .save()
      .then(({ otp, _id, email }) => {
        sendMail(
          process.env.APP_ID,
          process.env.APP_PASSWORD,
          user.email,
          "Welcome to stackinflow",
          `<h1>Your One Time Password is: <b>${otp}</b></h1><br><h3>We hope you find our service cool.</h3>`
        )
          .then((info) => {
            console.log(info);
            res.send({
              data: { _id, email },
              message:
                "Account created successfully, please enter otp sent to given mail address for complete verification."
            });
          })
          .catch((error) => {
            userSchema
              .deleteOne({ _id: userId })
              .then((info) => {
                console.log(info);
                errorHandler(error, "UserController.createUser.sendMail", res);
              })
              .catch(() =>
                errorHandler(
                  error,
                  "UserController.createUser.sendMail.deleteOne",
                  res
                )
              );
          });
      })
      .catch((err) => errorHandler(err, "UserController.createUser", res));
  },

  userById: async (req, res) => {
    await userSchema
      .findOne({ _id: req.query.id })
      .select(
        "_id name dname userlikes email about address gitlink title twitter weblink profile"
      )
      .then((user) => res.send({ data: user, msg: "success" }))
      .catch((err) => res.send(err));
  },

  listUser: async (req, res) => {
    await userSchema
      .find()
      .select("_id name dname userlikes password")
      .then((users) => res.send({ msg: users.length, data: users }))
      .catch((err) => res.send(err));
  },

  userByLikes: async (req, res) => {
    const [limit, page] = [+req.query.limit || 8, +req.query.page || 0];
    await userSchema
      .find()
      .sort({ userlikes: -1 })
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .select("_id name dname userlikes gitlink twitter weblink")
      .then((users) => res.send({ data: users, msg: "success" }))
      .catch((err) => res.send(err));
  }
};

module.exports = userController;
