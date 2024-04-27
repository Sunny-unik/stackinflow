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

  updateAlike: async (req, res) => {
    try {
      const answer = await answerSchema.findOne({ _id: req.body.id });
      if (!answer) return res.status(404).send({ msg: "Answer not found" });
      const userIdIndex = answer.alikes.indexOf(req.body.userId);
      userIdIndex !== -1
        ? answer.alikes.splice(userIdIndex, 1)
        : answer.alikes.push(req.body.userId);
      const updatedAnswer = await answer.save();
      res.send({ data: updatedAnswer, msg: "Answer updated successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  deleteAnswer: async (req, res) => {
    const { answerId, userId } = req.body;
    let responseSent = false;
    try {
      const answer = await answerSchema.findById(answerId);
      const isAuthor = answer.userId.equals(userId);
      if (!isAuthor)
        return res.status(401).send("No rights to perform that action");
      const deleteData = await answer.delete();
      res.send({ data: deleteData, msg: "Answer deleted successfully" });
      responseSent = true;
      await userSchema.updateOne({ _id: userId }, { $inc: { userlikes: -10 } });
      await questionSchema.updateOne(
        { _id: answer.qid },
        { $pull: { answers: answerId } }
      );
    } catch (error) {
      !responseSent && res.status(500).send("Server Error");
    }
  }
};

module.exports = answerController;
