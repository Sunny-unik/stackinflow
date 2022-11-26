const answerSchema = require("../models/answerSchema");

const answerController = {
  listAnswer: async (req, res) => {
    await answerSchema
      .find()
      .select("_id question answers userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((answers) => res.send({ msg: answers.length, data: answers }))
      .catch((err) => res.send(err));
  },

  createAnswer: async (req, res) => {
    const answer = await new answerSchema(req.body);
    answer
      .save()
      .then((result) => res.send({ data: result, msg: "Answer Submitted" }))
      .catch((err) => res.status(500).send(err));
  },

  addAlike: async (req, res) => {
    await answerSchema
      .updateOne({ _id: req.body.id }, { $push: { alikes: req.body.userId } })
      .then((result) =>
        res.send({ data: result, msg: "Like added successfully!" })
      )
      .catch((error) => res.send(error));
  },

  removeAlike: async (req, res) => {
    await answerSchema
      .updateOne({ _id: req.body.id }, { $set: { alikes: req.body.alikes } })
      .then((result) =>
        res.send({ data: result, msg: "Like removed successfully!" })
      )
      .catch((err) => res.send(err));
  },

  deleteAnswer: async (req, res) => {
    answerSchema
      .deleteOne({ _id: req.body.answerId })
      .then((result) => res.send({ data: result, msg: "Answer is deleted!" }))
      .catch((err) => res.send(err));
  }
};

module.exports = answerController;
