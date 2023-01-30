const sendMail = require("../helpers/mailer");
const userSchema = require("../models/userSchema");
const upload = require("../helpers/multerConfig");
const fs = require("fs");
const { sign, verify } = require("jsonwebtoken");

const userController = {
  checkLogin: async (req, res) => {
    const checkPassword = (user) => {
      if (user.password === req.body.password) {
        user.password = undefined;
        const token = sign({ dname: user.dname }, "verySecretCode", {
          expiresIn: "7d"
        });
        return [user, token];
      }
    };

    await userSchema
      .findOne({ $or: [{ email: req.body.email }, { dname: req.body.email }] })
      .then((user) => {
        let filterData;
        if (!user) return res.send({ msg: "user not found" });
        else filterData = checkPassword(user);
        filterData.length
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
      .catch((err) => res.send(err));
  },

  sendOtp: (req, res) => {
    const randomNum = Math.floor(Math.random() * 1000000).toString();
    const otp =
      randomNum.length < 6
        ? randomNum + Math.floor(Math.random() * 10).toString()
        : randomNum;
    res.send({ otp: otp });
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

  validEmail: async (req, res) => {
    const userId = req.body?.id;
    await userSchema
      .findOne({ $and: [{ email: req.body.email }, { _id: { $ne: userId } }] })
      .select("email")
      .then((result) => res.send(result ?? "valid email"))
      .catch((err) => res.send(err));
  },

  validDname: async (req, res) => {
    const userId = req.body?.id;
    let isDnameValid;
    await userSchema
      .findOne({ $and: [{ dname: req.body.dname }, { _id: { $ne: userId } }] })
      .select("dname")
      .then((result) => {
        isDnameValid = result ?? "valid dname";
        res && res.send(isDnameValid);
      })
      .catch((err) => res && res.send(err));
    return isDnameValid === "valid dname" ? true : false;
  },

  sendOtpEmail: async (req, res) => {
    const randomNum = Math.floor(Math.random() * 1000000).toString();
    const otp =
      randomNum.length < 6
        ? randomNum + Math.floor(Math.random() * 10).toString()
        : randomNum;
    await userSchema
      .findOne({ $or: [{ email: req.body.email }, { dname: req.body.email }] })
      .select("_id email password")
      .then((user) => {
        if (user) {
          // sendMail(
          //   process.env.APP_ID,
          //   process.env.APP_PASSWORD,
          //   user.email,
          //   "Welcome to stackinflow",
          //   `Your One Time Password is - <h3>${otp}</h3><br>
          //   <h6>We hope you find our service cool.</h6>`
          // );
          res.send({
            data: user,
            otp: otp.length < 6 ? otp + "1" : otp,
            msg: "Otp sent"
          });
        } else res.send({ data: null, msg: "User not found" });
      })
      .catch((err) => res.send(err));
  },

  updateUserPoint: async (req, res) => {
    await userSchema
      .updateOne(
        { _id: req.body.id },
        { $set: { userlikes: req.body.userpoint } }
      )
      .then((result) => {
        res.send({
          data: result,
          msg: result.modifiedCount ? "User points updated" : "not found"
        });
      })
      .catch((err) => res.send(err));
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
    const user = await new userSchema(req.body);
    user
      .save()
      .then((result) => res.send({ data: result, msg: "Account Registered" }))
      .catch((err) => res.send(err));
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
