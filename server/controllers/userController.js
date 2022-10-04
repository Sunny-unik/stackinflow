const { sendMail } = require('../helpers/mailer');
const userSchema = require('../models/userSchema');
const upload = require('../helpers/multerConfig');

exports.checkLogin = async (req, res) => {
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
        res.send('user not found');
        return false;
      } else filterData = checkPassword(user);
      filterData ? res.send(filterData) : res.send('incorrect password');
    })
    .catch(err => res.send(err));
};

exports.validEmail = async (req, res) => {
  await userSchema
    .findOne({ email: req.body.email })
    .select('email')
    .then(result => res.send(result ?? 'valid email'))
    .catch(err => res.send(err));
};

exports.validDname = async (req, res) => {
  await userSchema
    .findOne({ dname: req.body.dname })
    .select('dname')
    .then(result => res.send(result ?? 'valid dname'))
    .catch(err => res.send(err));
};

exports.sendOtpEmail = async (req, res) => {
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
      res.send({ data: user });
    })
    .catch(err => res.send({ data: err }));
};

exports.updateUserPoint = async (req, res) => {
  await userSchema
    .updateOne({ _id: req.body.id }, { $set: { userlikes: req.body.userpoint } })
    .then(result => res.send(result))
    .catch(err => res.send(err));
};

exports.updateUserDetails = async (req, res) => {
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
          address: req.body.address,
        },
      }
    )
    .then(result => res.send(result))
    .catch(err => res.send(err));
};

exports.updateUserProfile = (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send({ status: 'failed', data: err });
      return false;
    }
    (async () => {
      await userSchema
        .updateOne({ _id: req.body.id }, { $set: { profile: req.files.profile[0].filename } })
        .then(result => res.send(result))
        .catch(err => res.send(err));
    })();
  });
};

exports.updatePassword = async (req, res) => {
  await userSchema
    .updateOne(
      { $or: [{ email: req.body.email }, { dname: req.body.email }] },
      { $set: { password: req.body.password } }
    )
    .then(user => res.send(user))
    .catch(err => res.send(err));
};

exports.createUser = async (req, res) => {
  const user = await new userSchema(req.body);
  user
    .save()
    .then(data => res.send(data))
    .catch(err => res.send(err));
};

exports.userByUserdname = async (req, res) => {
  await userSchema
    .find({ _id: req.query.id })
    .select('_id name dname userlikes email about address gitlink title twitter weblink profile')
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.send(err));
};

exports.listUser = async (req, res) => {
  await userSchema
    .find()
    .select('_id name dname userlikes')
    .then(users => res.status(200).json({ total: users.length, data: users }))
    .catch(err => res.status(500).send(err));
};
