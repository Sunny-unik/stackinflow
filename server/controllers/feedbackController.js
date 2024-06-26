const sendMail = require("../helpers/mailer");
const feedbackSchema = require("../models/feedbackSchema");
const requestSchema = require("../models/requestSchema");

const feedbackController = {
  addFeedback: (req, res) => {
    const { isTagRequest } = req.body;
    const feedback = new (isTagRequest ? requestSchema : feedbackSchema)(
      req.body
    );
    feedback
      .save()
      .then((result) => {
        sendMail(
          process.env.APP_ID,
          process.env.APP_PASSWORD,
          req.query.userEmail,
          "Thanks for submit your feedback",
          `<h2>stackinflow</h2><br>
          <h4> Your ${
            isTagRequest ? "Request" : "Feedback"
          } Sent SuccessFully </h4><br>
          <h6>We hope you find our service cool.</h6><br>`
        );
        res.send({
          data: result,
          msg: `Your ${isTagRequest ? "Request" : "Feedback"} submitted`
        });
      })
      .catch((err) => res.send(err));
  },

  listFeedback: async (req, res) => {
    await feedbackSchema
      .find()
      .populate("userId", "_id dname name userlikes")
      .then((users) =>
        res.status(200).json({ total: users.length, data: users })
      )
      .catch((err) => res.status(500).send(err));
  }
};

module.exports = feedbackController;
