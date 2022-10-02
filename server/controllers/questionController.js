const answerSchema = require('../models/answerSchema');
const questionSchema = require('../models/questionSchema');

const questionController = {
  listQuestions: async (req, res) => {
    await questionSchema
      .find()
      .select('_id question userId date qlikes tags')
      .populate('userId', '_id dname userlikes')
      .then(questions => res.status(200).json({ total: questions.length, data: questions }))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  questionsPerPage: async (req, res) => {
    const [limit, page] = [+req.query.limit, +req.query.page];
    await questionSchema
      .find()
      .limit(limit * 1)
      .skip(page * 1 * limit)
      .select('_id question userId date qlikes tags')
      .populate('userId', '_id dname userlikes')
      .then(questions => res.status(200).json({ data: questions }))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  questionsSearch: async (req, res) => {
    await questionSchema
      .find({ question: { $regex: req.body.search } })
      .select('_id question userId date qlikes tags')
      .populate('userId', '_id dname userlikes')
      .then(questions => res.status(200).json({ data: questions }))
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  questionById: async (req, res) => {
    await questionSchema
      .find({ _id: req.query.id })
      .populate({
        path: 'answers',
        select: '_id answer date userId alikes',
        strictPopulate: false,
        populate: [{ path: 'userId', select: '_id dname userlikes' }],
      })
      .populate('userId', '_id dname userlikes')
      .then(question => res.send(question));
  },

  createQuestion: async (req, res) => {
    const question = await new questionSchema(req.body);
    question
      .save()
      .then(result => {
        res.status(200).json({ data: result });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  addQlike: async (req, res) => {
    try {
      await questionSchema.updateOne({ _id: req.body.id }, { $push: { qlikes: req.body.uid } });
      res.status(200).send('Like added successfully!');
    } catch (error) {
      res.send(error);
    }
  },

  removeQlike: async (req, res) => {
    try {
      await questionSchema.updateOne({ _id: req.body.id }, { $set: { qlikes: req.body.qlikes } });
      res.status(200).send('Like removed successfully!');
    } catch (error) {
      res.send(error);
    }
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
        console.log(result);
      })
    );
    questionSchema.deleteOne({ _id: req.body.id }, (err, result) => {
      if (err) throw err;
      res.status(200).send('Question is deleted!');
    });
  },

  updateQuestion: async (req, res) => {
    try {
      await questionSchema.updateOne(
        { _id: req.body.id },
        {
          $set: {
            question: req.body.question,
            questiondetail: req.body.questiondetail,
            tags: req.body.tags,
          },
        }
      );
      res.status(200).send('Your question updated successfully 😊');
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = questionController;
