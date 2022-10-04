const answerSchema = require('../models/answerSchema');

const answerController = {
  createAnswer: async (req, res) => {
    const answer = await new answerSchema(req.body);
    answer
      .save()
      .then(result => res.send({ data: result, msg: 'Answer Submitted' }))
      .catch(err => res.status(500).send(err));
  },

  addAlike: async (req, res) => {
    await answerSchema
      .updateOne({ _id: req.body.id }, { $push: { alikes: req.body.uid } })
      .then(result => res.send({ data: result, msg: 'Like added successfully!' }))
      .catch(error => res.send(error));
  },

  removeAlike: async (req, res) => {
    await answerSchema
      .updateOne({ _id: req.body.id }, { $set: { alikes: req.body.al } })
      .then(result => res.send({ data: result, msg: 'Like removed successfully!' }))
      .catch(err => res.send(err));
  },
};

module.exports = answerController;
