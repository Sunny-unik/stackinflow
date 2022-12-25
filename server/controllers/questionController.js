const answerSchema = require("../models/answerSchema");
const questionSchema = require("../models/questionSchema");

const questionController = {
  listQuestions: async (req, res) => {
    await questionSchema
      .find()
      .select("_id question answers userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ msg: questions.length, data: questions }))
      .catch((err) => res.send(err));
  },

  questionsPerUser: async (req, res) => {
    const [limit, page] = [+req.query.limit || 8, +req.query.page || 0];
    await questionSchema
      .find({ userId: req.query.userId })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .select("_id question userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.send(err));
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
      .catch((err) => res.send(err));
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
      .catch((err) => res.send(err));
  },

  countQuestions: async (req, res) => {
    const key = req.query.key;
    const value = req.query.value;
    const query = key && value ? { [key]: value } : {};
    await questionSchema
      .countDocuments(query)
      .then((count) => res.send({ msg: "success", data: count }))
      .catch((err) => res.send(err));
  },

  questionsPerPage: async (req, res) => {
    const [limit, page] = [+req.query.limit || 3, +req.query.page || 0];
    await questionSchema
      .find()
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .select("_id question userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.send(err));
  },

  tagsPerPage: async (req, res) => {
    const [limit, page, oldTags] = [
      +req.query.limit || 5,
      +req.query.page || 0,
      req.body.oldTags || []
    ];
    const tagsLength = req.body.tagsLength || oldTags.length + 10;

    await questionSchema
      .find({}, { tags: 1 })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .then((tagObjects) => {
        let newTags = new Set([
          ...oldTags,
          ...tagObjects
            .map((q) => q.tags)
            .toString()
            .split(",")
        ]);
        newTags = [...newTags];
        if (
          newTags.length < tagsLength &&
          tagObjects[0] &&
          req.body.questionId != tagObjects[0]._id
        ) {
          req.body.oldTags = newTags;
          req.query.limit = limit + 1;
          req.query.page = page + 1;
          req.body.tagsLength = tagsLength;
          req.body.questionId = !req.body.questionId
            ? tagObjects[0]._id
            : req.body.questionId;
          questionController.tagsPerPage(req, res);
        } else res.send({ data: newTags, msg: "success" });
      })
      .catch((err) => res.send({ error: err }));
  },

  oldestWithLimit: async (req, res) => {
    const limit = +req.query.limit || 10;
    await questionSchema
      .find()
      .limit(limit * 1)
      .select("_id question userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.send(err));
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
      .catch((err) => res.send(err));
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
      .catch((err) => res.send(err));
  },

  questionsSearch: async (req, res) => {
    await questionSchema
      .find({ question: { $regex: req.query.search, $options: "$i" } })
      .select("_id question userId date qlikes tags")
      .populate("userId", "_id dname userlikes")
      .then((questions) => res.send({ data: questions, msg: "success" }))
      .catch((err) => res.send(err));
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
    const question = await new questionSchema(req.body);
    question
      .save()
      .then((result) =>
        res.send({ data: result, msg: "Question listed successfully" })
      )
      .catch((err) => res.send(err));
  },

  addQlike: async (req, res) => {
    await questionSchema
      .updateOne({ _id: req.body.id }, { $push: { qlikes: req.body.userId } })
      .then((result) =>
        res.send({ data: result, msg: "Like added successfully!" })
      )
      .catch((error) => res.send(error));
  },

  removeQlike: async (req, res) => {
    await questionSchema
      .updateOne({ _id: req.body.id }, { $set: { qlikes: req.body.qlikes } })
      .then((result) =>
        res.send({ data: result, msg: "Like removed successfully!" })
      )
      .catch((error) => res.send(error));
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
    await questionSchema
      .updateOne(
        { _id: req.body.id },
        {
          $set: {
            question: req.body.question,
            questiondetail: req.body.questiondetail,
            tags: req.body.tags
          }
        }
      )
      .then((result) =>
        res.send({ data: result, msg: "Your question updated successfully 😊" })
      )
      .catch((error) => res.send(error));
  }
};

module.exports = questionController;
