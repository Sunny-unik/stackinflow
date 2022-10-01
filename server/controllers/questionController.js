const questionSchema = require('../models/questionSchema');

exports.listQuestions = async (req, res) => {
  await questionSchema
    .find()
    .select('_id question userdname date qlikes tags')
    .then(questions => res.status(200).json({ total: questions.length, data: questions }))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.questionsPerPage = async (req, res) => {
  const [limit, page] = [+req.query.limit, +req.query.page];
  await questionSchema
    .find()
    .limit(limit * 1)
    .skip(page * 1 * limit)
    .select('_id question userdname date qlikes tags')
    .then(questions => res.status(200).json({ data: questions }))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.questionsSearch = async (req, res) => {
  await questionSchema
    .find(req.body.search ? { question: { $regex: req.body.search } } : { _id: req.query.id })
    .then(questions => res.status(200).json({ data: questions }))
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
};

exports.createQuestion = async (req, res) => {
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
};

exports.addQlike = async (req, res) => {
  try {
    await questionSchema.updateOne({ _id: req.body.id }, { $push: { qlikes: req.body.uid } });
    res.status(200).send('Like added successfully!');
  } catch (error) {
    res.send(error);
  }
};

exports.removeQlike = async (req, res) => {
  try {
    await questionSchema.updateOne({ _id: req.body.id }, { $set: { qlikes: req.body.qlikes } });
    res.status(200).send('Like removed successfully!');
  } catch (error) {
    res.send(error);
  }
};

exports.deleteQuestion = async (req, res) => {
  questionSchema.deleteOne({ _id: req.body.qid }, (err, result) => {
    if (err) throw err;
    res.status(200).send('Question is deleted!');
  });
};

exports.updateQuestion = async (req, res) => {
  try {
    await questionSchema.updateOne(
      { _id: req.body.questionid },
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
};
