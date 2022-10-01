const { sendMail } = require('../helpers/mailer');
const feedback = require('../models/feedbackSchema');

exports.addFeedback = async (req, res) => {
  const feedback = await new feedback(req.body);
  feedback
    .save()
    .then(result => {
      res.status(200).json({ data: result });
      sendMail(
        process.env.APP_ID,
        process.env.APP_PASSWORD,
        req.body.useremail,
        'Thanks for submit your feedback',
        `<h2>stackinflow</h2><br><h4> Feedback Sent SuccessFull </h4><br><h6>We hope you find our service cool.</h6>`
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.listFeedback = async (req, res) => {
  await feedback
    .find()
    .then(users => res.status(200).json({ total: users.length, data: users }))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};
