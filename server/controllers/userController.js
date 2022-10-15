const sendMail = require("../helpers/mailer");
const userSchema = require("../models/userSchema");
const upload = require("../helpers/multerConfig");
const fs = require("fs");

const userController = {
  checkLogin: async (req, res) => {
    const checkPassword = (user) => {
      if (user.password === req.body.password) {
        user.password = undefined;
        return user;
      }
    };

    await userSchema
      .findOne({ $or: [{ email: req.body.email }, { dname: req.body.email }] })
      .then((user) => {
        let filterData;
        if (!user) return res.send({ msg: "user not found" });
        else filterData = checkPassword(user);
        filterData
          ? res.send({ data: filterData, msg: "Credentials Matched" })
          : res.send({ msg: "incorrect password" });
      })
      .catch((err) => res.send(err));
  },

  validEmail: async (req, res) => {
    await userSchema
      .findOne({
        $and: [{ email: req.body.email }, { _id: { $ne: req.body.id } }]
      })
      .select("email")
      .then((result) => res.send(result ?? "valid email"))
      .catch((err) => res.send(err));
  },

  validDname: async (req, res) => {
    let isDnameValid;
    await userSchema
      .findOne({
        $and: [{ dname: req.body.dname }, { _id: { $ne: req.body.id } }]
      })
      .select("dname")
      .then((result) => {
        isDnameValid = result ?? "valid dname";
        res && res.send(isDnameValid);
      })
      .catch((err) => res && res.send(err));
    return isDnameValid === "valid dname" ? true : false;
  },

  sendOtpEmail: async (req, res) => {
    const otp = Math.floor(Math.random() * 1000000 + 1).toString();
    await userSchema
      .findOne({ $or: [{ email: req.body.email }, { dname: req.body.email }] })
      .select("_id email password")
      .then((user) => {
        if (user) {
          sendMail(
            process.env.APP_ID,
            process.env.APP_PASSWORD,
            user.email,
            "Welcome to stackinflow",
            `Your One Time Password is - <h3>${otp}</h3><br>
          <h6>We hope you find our service cool.</h6>`
          );
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
      .then((result) => res.send({ data: result, msg: "User points updated" }))
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
      .find({ _id: req.query.id })
      .select(
        "_id name dname userlikes email about address gitlink title twitter weblink profile"
      )
      .then((user) => res.send({ data: user, msg: "success" }))
      .catch((err) => res.send(err));
  },

  listUser: async (req, res) => {
    await userSchema
      .find()
      .select("_id name dname userlikes")
      .then((users) => res.send({ msg: users.length, data: users }))
      .catch((err) => res.send(err));
  }
};

module.exports = userController;
