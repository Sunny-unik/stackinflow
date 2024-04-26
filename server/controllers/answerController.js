const answerSchema = require("../models/answerSchema");
const questionSchema = require("../models/questionSchema");
const userSchema = require("../models/userSchema");
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
    const answerObj = new answerSchema(req.body);
    try {
      const userData = await userSchema
        .findOne({ _id: req.body.userId })
        .select("_id dname userlikes");
      if (!userData) throw new Error("Invalid userId");
      await answerObj.save();
      const updateResult = await questionSchema.updateOne(
        { _id: req.body.qid },
        { $push: { answers: answerObj._id } }
      );
      if (updateResult.acknowledged) {
        res.send({
          data: { ...answerObj._doc, userId: userData },
          status: "ok"
        });
        userData.userlikes = userData.userlikes + 10;
        await userData.save();
      } else {
        answerSchema.deleteOne({ _id: _id });
        throw new Error("answerId isn't updated on question");
      }
    } catch (error) {
      res.status(500).send(error);
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
