const questionCollection = require('../models/questionSchema');

exports.questionsLength = async (req, res) => {
  await questionCollection.find().toArray((err, docs) => {
    if (!err) {
      res.send({ status: 'ok', data: docs.length });
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};

exports.listQuestions = async (req, res) => {
  await questionCollection.find().toArray((err, docs) => {
    if (!err) {
      res.send({ status: 'ok', data: docs });
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};

exports.questionsPerPage = async (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  await questionCollection
    .find()
    .limit(limit * 1)
    .skip(page * 1 * limit)
    .toArray((err, docs) => {
      if (!err) {
        res.send({ status: 'ok', data: docs });
      } else {
        res.send({ status: 'failed', data: err });
      }
    });
};

exports.questionsById = async (req, res) => {
  await questionCollection.find({ _id: req.query.id }).toArray((err, docs) => {
    if (!err) {
      res.send({ status: 'ok', data: docs });
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};

exports.questionsByQuestion = async (req, res) => {
  await questionCollection.find({ question: req.body.searchby }).toArray((err, docs) => {
    if (!err) {
      res.send({ status: 'ok', data: docs });
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};

exports.createQuestion = async (req, res) => {
  await questionCollection.insert(req.body, (err, result) => {
    if (!err) {
      res.send({ status: 'ok', data: 'Your Question Listed' });
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};

exports.createAnswer = async (req, res) => {
  await questionCollection.updateOne(
    { _id: ObjectId(req.body.qid) },
    { $push: { answers: req.body } },
    (err, docs) => {
      if (!err) {
        res.send({ status: 'ok', data: 'Your Answer is Submitted' });
      } else {
        res.send({ status: 'failed', data: err });
      }
    }
  );
};

exports.addQlike = async (req, res) => {
  await questionCollection.updateOne(
    { _id: ObjectId(req.body.qid) },
    { $push: { qlikes: req.body.uid } },
    (err, docs) => {
      if (!err) {
        res.send({ status: 'ok', data: 'like added' });
      } else {
        res.send({ status: 'failed', data: err });
      }
    }
  );
};

exports.removeQlike = async (req, res) => {
  await questionCollection.updateOne(
    { _id: ObjectId(req.body.qid) },
    { $set: { qlikes: req.body.qlikes } },
    (err, docs) => {
      if (!err) {
        res.send({ status: 'ok', data: 'like removed' });
      } else {
        res.send({ status: 'failed', data: err });
      }
    }
  );
};

exports.addAlike = async (req, res) => {
  await questioncollection.updateOne(
    { _id: ObjectId(req.body.qid), answers: { $elemMatch: { date: req.body.ad } } },
    { $push: { 'answers.$.alikes': req.body.uid } },
    (err, docs) => {
      if (!err) {
        res.send({ status: 'ok', data: 'like added' });
      } else {
        res.send({ status: 'failed', data: err });
      }
    }
  );
};

exports.removeAlike = async (req, res) => {
  await questioncollection.updateOne(
    { _id: ObjectId(req.body.qid), answers: { $elemMatch: { date: req.body.ad } } },
    { $set: { 'answers.$.alikes': req.body.al } },
    (err, docs) => {
      if (!err) {
        res.send({ status: 'ok', data: 'like removed' });
      } else {
        res.send({ status: 'failed', data: err });
      }
    }
  );
};

exports.deleteQuestion = async (req, res) => {
  await questionCollection.deleteOne({ _id: ObjectId(req.body.qid) }, (err, result) => {
    if (!err) {
      res.send({ status: 'ok', data: 'Question deleted successfully ☺' });
    } else {
      res.send({ status: 'failed', data: err });
    }
  });
};

exports.updateQuestion = async (req, res) => {
  await questionCollection.updateOne(
    { _id: ObjectId(req.body.questionid) },
    {
      $set: {
        question: req.body.question,
        questiondetail: req.body.questiondetail,
        tags: req.body.tags,
      },
    },
    (err, result) => {
      if (!err) {
        res.send({ status: 'ok', data: 'Your question updated successfully 😊' });
      } else {
        res.send({ status: 'failed', data: err });
      }
    }
  );
};
