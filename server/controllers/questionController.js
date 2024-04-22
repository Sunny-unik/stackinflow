const answerSchema = require("../models/answerSchema");
const questionSchema = require("../models/questionSchema");
const tagSchema = require("../models/tagSchema");
const userController = require("./userController");
const { ObjectId } = require("mongoose").Types;

const questionController = {
  listQuestions: async (req, res) => {
    await questionSchema
      .find()
      .select("_id question answers userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ msg: questions.length, data: questions }))
      .catch((err) => res.status(500).send(err));
  },

  questionsPerUser: async (req, res) => {
    const [limit, page] = [+req.query.limit || 8, +req.query.page || 0];
    try {
      const pipeline = [
        { $match: { userId: ObjectId(req.query.userId) } },
        {
          $addFields: {
            qlikesCount: { $size: "$qlikes" },
            answersCount: { $size: "$answers" }
          }
        },
        {
          $project: {
            _id: 1,
            question: 1,
            userId: 1,
            date: 1,
            tags: 1,
            qlikesCount: 1,
            answersCount: 1
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
            pipeline: [{ $project: { _id: 1, dname: 1, userlikes: 1 } }]
          }
        },
        { $unwind: "$userId" },
        { $sort: { date: -1 } },
        { $skip: page * limit },
        { $limit: limit }
      ];
      const questions = await questionSchema.aggregate(pipeline);
      res.send({ data: questions, msg: "success" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  userLikedQuestions: async (req, res) => {
    const [limit, page] = [+req.query.limit || 8, +req.query.page || 0];
    await questionSchema
      .find({ qlikes: { $in: req.query.userId } })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .select("_id question userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.status(500).send(err));
  },

  questionByTag: async (req, res) => {
    const [limit, page] = [+req.query.limit || 8, +req.query.page || 0];
    await questionSchema
      .find({ tags: { $in: req.query.tag } })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .select("_id question userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.status(500).send(err));
  },

  countQuestions: async (req, res) => {
    const key = req.query.key;
    const value = req.query.value;
    const query = key && value ? { [key]: value } : {};
    await questionSchema
      .countDocuments(query)
      .then((count) => res.send({ msg: "success", data: count }))
      .catch((err) => res.status(500).send(err));
  },

  questionsPerPage: async (req, res) => {
    const [limit, page] = [+req.query.limit || 8, +req.query.page || 0];
    await questionSchema
      .find()
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .select("_id question userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.status(500).send(err));
  },

  oldestWithLimit: async (req, res) => {
    const limit = +req.query.limit || 10;
    await questionSchema
      .find()
      .limit(limit * 1)
      .select("_id question userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.status(500).send(err));
  },

  mostLikedWithLimit: async (req, res) => {
    const limit = +req.query.limit || 10;
    await questionSchema
      .aggregate()
      .addFields({ qlikesCount: { $size: `$qlikes` } })
      .sort({ qlikesCount: -1 })
      .limit(limit * 1)
      .lookup({
        from: "users",
        as: "userId",
        localField: "userId",
        foreignField: "_id",
        pipeline: [
          { $unwind: "$_id" },
          { $project: { _id: 1, dname: 1, userlikes: 1 } }
        ]
      })
      .unwind("userId")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.status(500).send(err));
  },

  filterByAnswerWithLimit: async (req, res) => {
    const limit = +req.query.limit || 10;
    const filterType = req.query.type === "ne" ? { $ne: 0 } : { $eq: 0 };
    await questionSchema
      .aggregate()
      .addFields({ answersCount: { $size: `$answers` } })
      .match({ answersCount: filterType })
      .sort({ answersCount: -1, date: -1 })
      .limit(limit * 1)
      .lookup({
        from: "users",
        as: "userId",
        localField: "userId",
        foreignField: "_id",
        pipeline: [
          { $unwind: "$_id" },
          { $project: { _id: 1, dname: 1, userlikes: 1 } }
        ]
      })
      .unwind("userId")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.status(500).send(err));
  },

  questionsSearch: async (req, res) => {
    try {
      const { search, qid } = req.query;
      const keywords = search.trim().split(/\s+/);
      const searchQuery = keywords.map((k) => new RegExp(k, "i"));
      const queries = [
        {
          $or: [
            { question: { $in: searchQuery } },
            { tags: { $in: searchQuery } }
          ]
        }
      ];
      if (qid && qid !== "undefined") queries.push({ _id: { $ne: qid } });
      const questions = await questionSchema
        .find({ $and: queries })
        .select("_id question userId date qlikes tags")
        .populate("userId", "_id dname userlikes")
        .exec(); // Use exec() for queries to return a promise
      res.send({ data: questions, msg: "success" });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  questionById: async (req, res) => {
    await questionSchema
      .findOne({ _id: req.query.id })
      .populate({
        path: "answers",
        select: "_id answer date userId alikes",
        strictPopulate: false,
        populate: [{ path: "userId", select: "_id dname userlikes" }]
      })
      .populate("userId", "_id dname userlikes")
      .then((question) => res.send({ data: question, msg: "success" }))
      .catch((err) => res.status(400).send(err));
  },

  createQuestion: async (req, res) => {
    const uniqueTags = [...new Set(req.body.tags)];
    const question = new questionSchema({ ...req.body, tags: uniqueTags });
    question
      .save()
      .then(async (result) => {
        await userController.updateUserPoint({ body: { id: req.body.userId } });
        await updateTagsQuestionCount(null, uniqueTags);
        res.send({ data: result, msg: "Question listed successfully" });
      })
      .catch((err) => res.status(500).send(err));
  },

  addQlike: async (req, res) => {
    await questionSchema
      .updateOne({ _id: req.body.id }, { $push: { qlikes: req.body.userId } })
      .then((result) =>
        res.send({ data: result, msg: "Like added successfully!" })
      )
      .catch((error) => res.status(500).send(error));
  },

  removeQlike: async (req, res) => {
    await questionSchema
      .updateOne({ _id: req.body.id }, { $set: { qlikes: req.body.qlikes } })
      .then((result) =>
        res.send({ data: result, msg: "Like removed successfully!" })
      )
      .catch((error) => res.status(500).send(error));
  },

  deleteQuestion: async (req, res) => {
    let answerIds;
    await questionSchema
      .findById(req.body.id)
      .then((question) => (answerIds = question.answers))
      .catch((err) => console.log(err));
    answerIds.forEach((id) =>
      answerSchema.deleteOne({ _id: id }, (err, result) => {
        if (err) throw err;
      })
    );
    questionSchema.deleteOne({ _id: req.body.id }, (err, result) => {
      if (err) throw err;
      res.send({ data: result, msg: "Question is deleted!" });
    });
  },

  updateQuestion: async (req, res) => {
    const { userId } = req.decoded;
    let question;
    try {
      question = await questionSchema.findOne({
        $and: [{ _id: req.body.id }, { userId: userId }]
      });
    } catch (error) {
      return res.status(500).send(error);
    }
    questionSchema
      .updateOne(
        { $and: [{ _id: req.body.id }, { userId: userId }] },
        {
          $set: {
            question: req.body.question,
            questiondetail: req.body.questionDetail,
            tags: req.body.tags
          }
        }
      )
      .then(async (result) => {
        const { modifiedCount, matchedCount } = result;
        if (!matchedCount)
          return res.send({
            data: null,
            msg: "Not authorized to perform this action"
          });
        await updateTagsQuestionCount(question.tags, req.body.tags);
        res.send({
          data: result,
          msg: modifiedCount
            ? "Your question updated successfully 😊"
            : "No changes have been made now"
        });
      })
      .catch((error) => res.status(500).send(error));
  }
};

module.exports = questionController;

async function updateTagsQuestionCount(
  questionTags,
  updatedTags,
  countOperation = 1
) {
  try {
    if (!questionTags) {
      return await Promise.all(
        updatedTags.map(async (tag) => {
          await tagSchema.updateOne(
            { name: tag },
            { $inc: { questionsCount: countOperation } }
          );
        })
      );
    }
    const newTags = updatedTags.filter((t) => !questionTags.includes(t)),
      removedTags = questionTags.filter((t) => !updatedTags.includes(t));
    await updateTagsQuestionCount(null, newTags);
    await updateTagsQuestionCount(null, removedTags, -1);
  } catch (error) {
    return false;
  }
}
