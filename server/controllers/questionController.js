const answerSchema = require('../models/answerSchema');
const questionSchema = require('../models/questionSchema');

const questionController = {
  listQuestions: async (req, res) => {
    await questionSchema
      .find()
      .select('_id question userId date qlikes tags')
      .populate('userId', '_id dname userlikes')
      .then(questions => res.send({ msg: questions.length, data: questions }))
      .catch(err => res.send(err));
  },

  questionsPerPage: async (req, res) => {
    const [limit, page] = [+req.query.limit, +req.query.page];
    await questionSchema
      .find()
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .select('_id question userId date qlikes tags')
      .populate('userId', '_id dname userlikes')
      .then(questions => res.send({ data: questions, msg: 'success' }))
      .catch(err => res.send(err));
  },

  questionsSearch: async (req, res) => {
    await questionSchema
      .find({ question: { $regex: req.body.search } })
      .select('_id question userId date qlikes tags')
      .populate('userId', '_id dname userlikes')
      .then(questions => res.send({ data: questions, msg: 'success' }))
      .catch(err => res.send(err));
  },

  questionById: async (req, res) => {
    await questionSchema
      .findOne({ _id: req.query.id })
      .populate({
        path: 'answers',
        select: '_id answer date userId alikes',
        strictPopulate: false,
        populate: [{ path: 'userId', select: '_id dname userlikes' }],
      })
      .populate('userId', '_id dname userlikes')
      .then(question => res.send({ data: question, msg: 'success' }))
      .catch(err => res.send(err));
  },

  createQuestion: async (req, res) => {
    const question = await new questionSchema(req.body);
    question
      .save()
      .then(result => res.send({ data: result, msg: 'Question listed successfully' }))
      .catch(err => res.send(err));
  },

  addQlike: async (req, res) => {
    await questionSchema
      .updateOne({ _id: req.body.id }, { $push: { qlikes: req.body.uid } })
      .then(result => res.send({ data: result, msg: 'Like added successfully!' }))
      .catch(error => res.send(error));
  },

  removeQlike: async (req, res) => {
    await questionSchema
      .updateOne({ _id: req.body.id }, { $set: { qlikes: req.body.qlikes } })
      .then(result => res.send({ data: result, msg: 'Like removed successfully!' }))
      .catch(error => res.send(error));
  },

  deleteQuestion: async (req, res) => {
    let answerIds;
    await questionSchema
      .findById(req.body.id)
      .then(question => (answerIds = question.answers))
      .catch(err => res.send(err));
    answerIds.forEach(id =>
      answerSchema.deleteOne({ _id: id }, (err, result) => {
        if (err) throw err;
      })
    );
    questionSchema.deleteOne({ _id: req.body.id }, (err, result) => {
      if (err) throw err;
      res.send({ data: result, msg: 'Question is deleted!' });
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
            tags: req.body.tags,
          },
        }
      )
      .then(result => res.send({ data: result, msg: 'Your question updated successfully 😊' }))
      .catch(error => res.send(error));
  },
};

module.exports = questionController;
