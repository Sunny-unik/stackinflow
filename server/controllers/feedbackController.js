const { sendMail } = require('../helpers/mailer');
const feedbackCollection = require('../models/feedbackSchema');

exports.sendFeedback = async (req, res) => {
  await feedbackCollection.insert(req.body, (err, result) => {
    if (!err) {
      res.send({ status: 'ok', data: 'Feedback Submitted Successfully' });
      sendMail(
        process.env.APP_ID,
        process.env.APP_PASSWORD,
        req.body.useremail,
        'Thanks for submit your feedback',
        `<h2>stackinflow</h2><br><h4> Feedback Sent SuccessFull </h4><br><h6>We hope you find our service cool.</h6>`
      );
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};
