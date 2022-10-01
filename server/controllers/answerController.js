const answer = require('../models/answerSchema');

exports.createAnswer = async (req, res) => {
  await answer.updateOne(
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

exports.addAlike = async (req, res) => {
  await answer.updateOne(
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
  await answer.updateOne(
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
