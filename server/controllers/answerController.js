const answerSchema = require("../models/answerSchema");
const questionSchema = require("../models/questionSchema");
const { ObjectId } = require("mongoose").Types;

const answerController = {
  listAnswer: async (req, res) => {
    await answerSchema
      .find()
      .select("_id answer userId date alikes qid")
      .populate("userId", "_id dname userlikes")
      .then((answers) => res.send({ msg: answers.length, data: answers }))
      .catch((err) => res.send(err));
  },

  answersPerUser: async (req, res) => {
    const [limit, page] = [+req.query.limit || 15, +req.query.page || 0];
    try {
      const pipeline = [
        { $match: { userId: ObjectId(req.query.userId) } },
        { $addFields: { alikesCount: { $size: "$alikes" } } },
        {
          $lookup: {
            from: "questions",
            localField: "qid",
            foreignField: "_id",
            as: "questionData",
            pipeline: [{ $project: { _id: 1, tags: 1 } }]
          }
        },
        {
          $project: {
            _id: 1,
            answer: 1,
            date: 1,
            alikesCount: 1,
            questionData: 1
          }
        },
        {
          $unwind: { path: "$questionData", preserveNullAndEmptyArrays: true }
        },
        { $sort: { date: -1 } },
        { $skip: page * limit },
        { $limit: limit }
      ];
      const answers = await answerSchema.aggregate(pipeline);
      res.send({ data: answers, msg: "success" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  createAnswer: async (req, res) => {
    const answerObj = await new answerSchema(req.body);
    try {
      await answerObj.save();
      const { _id, answer, userId, date, alikes } = answerObj;
      await questionSchema
        .updateOne({ _id: req.body.qid }, { $push: { answers: _id } })
        .then((result) => {
          if (result.acknowledged) {
            res.send({
              data: { _id, answer, userId, date, alikes },
              msg: "Answer Submitted"
            });
          } else {
            answerSchema
              .deleteOne({ _id: _id })
              .then((result) =>
                res.send({ data: result, msg: "Error in post answer" })
              )
              .catch((err) =>
                res.send({ data: err, msg: "Error in post answer" })
              );
          }
        })
        .catch((err) => res.send(err));
    } catch (err) {
      res.status(500).send(err);
    }
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
