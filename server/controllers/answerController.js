const answerSchema = require('../models/answerSchema');

exports.createAnswer = async (req, res) => {
  const answer = await new answerSchema(req.body);
  answer
    .save()
    .then(result => {
      res.status(200).json({ data: result });
    })
    .catch(err => res.status(500).send(err));
};

exports.addAlike = async (req, res) => {
  await answerSchema
    .updateOne({ _id: req.body.id }, { $push: { alikes: req.body.uid } })
    .then(result => res.status(200).send({ result: result, msg: 'Like added successfully!' }))
    .catch(error => res.send(error));
};

exports.removeAlike = async (req, res) => {
  await answerSchema
    .updateOne({ _id: req.body.id }, { $set: { alikes: req.body.al } })
    .then(result => res.status(200).send({ result: result, msg: 'Like removed successfully!' }))
    .catch(err => res.send(err));
};
