const sendMail = require('../helpers/mailer');
const userSchema = require('../models/userSchema');
const upload = require('../helpers/multerConfig');

const userController = {
  checkLogin: async (req, res) => {
    const checkPassword = user => {
      if (user.password === req.body.password) {
        user.password = undefined;
        return user;
      }
    };
    await userSchema
      .findOne({ $or: [{ email: req.body.email }, { dname: req.body.email }] })
      .then(user => {
        let filterData;
        if (!user) {
          res.send({ msg: 'user not found' });
          return false;
        } else filterData = checkPassword(user);
        filterData
          ? res.send({ data: filterData, msg: 'Credentials Matched' })
          : res.send({ msg: 'incorrect password' });
      })
      .catch(err => res.send(err));
  },

  validEmail: async (req, res) => {
    await userSchema
      .findOne({ email: req.body.email })
      .select('email')
      .then(result => res.send(result ?? 'valid email'))
      .catch(err => res.send(err));
  },

  validDname: async (req, res) => {
    await userSchema
      .findOne({ dname: req.body.dname })
      .select('dname')
      .then(result => res.send(result ?? 'valid dname'))
      .catch(err => res.send(err));
  },

  sendOtpEmail: async (req, res) => {
    const otp = Math.floor(Math.random() * 1000000 + 1);
    await userSchema
      .findOne({ $or: [{ email: req.body.email }, { dname: req.body.email }] })
      .select('email')
      .then(user => {
        sendMail(
          process.env.APP_ID,
          process.env.APP_PASSWORD,
          user.email,
          'Welcome to stackinflow',
          `Your One Time Password is - <h3>${otp}</h3><br>
        <h6>We hope you find our service cool.</h6>`
        );
        res.send({ data: user, msg: 'Otp sent' });
      })
      .catch(err => res.send(err));
  },

  updateUserPoint: async (req, res) => {
    await userSchema
      .updateOne({ _id: req.body.id }, { $set: { userlikes: req.body.userpoint } })
      .then(result => res.send({ data: result, msg: 'User points updated' }))
      .catch(err => res.send(err));
  },

  updateUserDetails: async (req, res) => {
    let validDname;
    await userSchema
      .findOne({ dname: req.body.dname })
      .select('dname')
      .then(result => (validDname = result === null ? req.body.dname : result.dname))
      .catch(err => console.log('On update details', err));
    const message =
      validDname !== req.body.dname
        ? 'All fields are updated except username beacause entered username is already taken'
        : 'All entered details updated successfully';
    await userSchema
      .updateOne(
        { _id: req.body.id },
        {
          $set: {
            name: req.body.name,
            dname: validDname,
            title: req.body.title,
            about: req.body.about,
            weblink: req.body.weblink,
            gitlink: req.body.gitlink,
            twitter: req.body.twitter,
            address: req.body.address,
          },
        }
      )
      .then(result => res.send({ data: result, msg: message }))
      .catch(err => res.send(err));
  },

  updateUserProfile: (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.send({ data: err, msg: 'Profile update failed' });
        return false;
      }
      (async () => {
        await userSchema
          .updateOne({ _id: req.body.id }, { $set: { profile: req.files.profile[0].filename } })
          .then(result => res.send({ data: result, msg: 'Profile Updated' }))
          .catch(err => res.send(err));
      })();
    });
  },

  updatePassword: async (req, res) => {
    await userSchema
      .updateOne(
        { $or: [{ email: req.body.email }, { dname: req.body.email }] },
        { $set: { password: req.body.password } }
      )
      .then(user => res.send({ data: user, msg: 'Password Updated' }))
      .catch(err => res.send(err));
  },

  createUser: async (req, res) => {
    const user = await new userSchema(req.body);
    user
      .save()
      .then(result => res.send({ data: result, msg: 'Account registered' }))
      .catch(err => res.send(err));
  },

  userById: async (req, res) => {
    await userSchema
      .find({ _id: req.query.id })
      .select('_id name dname userlikes email about address gitlink title twitter weblink profile')
      .then(user => res.send({ data: user, msg: 'success' }))
      .catch(err => res.send(err));
  },

  listUser: async (req, res) => {
    await userSchema
      .find()
      .select('_id name dname userlikes')
      .then(users => res.send({ msg: users.length, data: users }))
      .catch(err => res.send(err));
  },
};

module.exports = userController;
