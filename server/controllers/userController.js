const { sendMail } = require('../helpers/mailer');
const user = require('../models/userSchema');
const upload = require('../helpers/multerConfig');

exports.checkLogin = async (req, res) => {
  await user
    .find({
      $or: [{ email: req.body.email }, { dname: req.body.email }],
      password: req.body.password,
    })
    .toArray((err, result) => {
      if (!err && result.length > 0) {
        res.send({ status: 'ok', data: result[0] });
      } else {
        res.send({ status: 'error', data: err });
      }
    });
};

exports.validEmail = async (req, res) => {
  await user.find({ email: req.body.email }).toArray((err, result) => {
    if (!err && result.length > 0) {
      res.send({ status: 'error', data: 'this email is already registered 🤔' });
    } else {
      res.send({ status: 'ok' });
    }
  });
};

exports.validDname = async (req, res) => {
  await user.find({ dname: req.body.dname }).toArray((err, result) => {
    if (!err && result.length > 0) {
      res.send({ status: result[0]._id, data: 'this username is already taken 🤔' });
    } else {
      res.send({ status: 'ok' });
    }
  });
};

exports.sendOtpEmail = async (req, res) => {
  await user
    .find({ $or: [{ email: req.body.email }, { dname: req.body.email }] })
    .toArray((err, result) => {
      if (!err && result.length > 0) {
        sendMail(
          process.env.APP_ID,
          process.env.APP_PASSWORD,
          result[0].email,
          'Welcome to stackinflow',
          `Your One Time Password is - <h3>${req.body.otp}</h3><br><h6>We hope you find our service cool.</h6>`
        );
        res.send({ status: 'ok', data: 'please enter correct otp' });
      } else {
        res.send({ status: 'error', data: err });
      }
    });
};

exports.updateUserPoint = async (req, res) => {
  const upoint = req.body.userpoint;
  await user.updateOne(
    { _id: ObjectId(req.body.userdname) },
    { $set: { userlikes: upoint } },
    (err, result) => {
      if (!err) {
        res.send({ status: 'ok', data: 'Your points updated successfully 😊' });
      } else {
        res.send({ status: 'failed', data: err });
      }
    }
  );
};

exports.updateUserDetails = async (req, res) => {
  await user.updateOne(
    { _id: ObjectId(req.body.obid) },
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
    },
    (err, result) => {
      if (!err) {
        res.send({ status: 'ok', data: 'Your details updated successfully 😊' });
      } else {
        res.send({ status: 'failed', data: err });
      }
    }
  );
};

exports.updateUser = (req, res) => {
  upload(req, res, err => {
    if (!err) {
      (async () => {
        await user.update(
          { _id: ObjectId(req.body.obid) },
          { $set: { profile: req.files.profile[0].filename } },
          (err, result) => {
            if (!err) {
              res.send({ status: 'ok', data: 'user profile updated successfully' });
            } else {
              res.send({ status: 'failed', data: err });
            }
          }
        );
      })();
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};

exports.updatePassword = async (req, res) => {
  await user.update(
    { $or: [{ email: req.body.email }, { dname: req.body.email }] },
    { $set: { password: req.body.newpassword } },
    (err, result) => {
      if (!err) {
        res.send({ status: 'ok', data: 'user password updated successfully' });
      } else {
        res.send({ status: 'failed', data: err });
      }
    }
  );
};

exports.createUser = async (req, res) => {
  await user.insert(req.body, (err, result) => {
    if (!err) {
      res.send({ status: 'ok', data: 'user created successfully' });
      sendMail(
        process.env.APP_ID,
        process.env.APP_PASSWORD,
        req.body.email,
        'Welcome to stackinflow',
        `<h2>stackinflow</h2><br><h4> Registration SuccessFull </h4><br>We hope you find our service cool.`
      );
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};

exports.userByUserdname = async (req, res) => {
  await user.find({ _id: ObjectId(req.query._id) }).toArray((err, docs) => {
    if (!err) {
      res.send({ status: 'ok', data: docs });
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};

exports.listUser = async (req, res) => {
  await user
    .find()
    .select('_id name dname userlikes')
    .then(users => res.status(200).json({ total: users.length, data: users }))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};
