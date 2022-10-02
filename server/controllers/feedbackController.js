const { sendMail } = require('../helpers/mailer');
const feedbackSchema = require('../models/feedbackSchema');
const userSchema = require('../models/userSchema');

exports.addFeedback = async (req, res) => {
  const feedback = await new feedbackSchema(req.body);
  feedback
    .save()
    .then(result => {
      res.status(200).json({ data: result });
      userSchema
        .findOne({ _id: result.userId.valueOf() })
        .select('_id email')
        .then(userData => {
          sendMail(
            process.env.APP_ID,
            process.env.APP_PASSWORD,
            userData.email,
            'Thanks for submit your feedback',
            `<h2>stackinflow</h2><br>
          <h4> Feedback Sent SuccessFull </h4><br>
          <h6>We hope you find our service cool.</h6><br>`
          );
        })
        .catch(err => console.log(err));
    })
    .catch(err => res.send(err));
};

exports.listFeedback = async (req, res) => {
  await feedbackSchema
    .find()
    .populate('userId', '_id dname name userlikes')
    .then(users => res.status(200).json({ total: users.length, data: users }))
    .catch(err => res.status(500).send(err));
};
