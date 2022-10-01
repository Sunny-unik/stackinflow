const answerSchema = require('../models/answerSchema');

exports.createAnswer = async (req, res) => {
  const answer = await new answerSchema(req.body);
  answer
    .save()
    .then(result => {
      res.status(200).json({ data: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.addAlike = async (req, res) => {
  try {
    await answerSchema.updateOne({ _id: req.body.id }, { $push: { alikes: req.body.uid } });
    res.status(200).send('Like added successfully!');
  } catch (error) {
    res.send(error);
  }
};

exports.removeAlike = async (req, res) => {
  try {
    await answerSchema.updateOne({ _id: req.body.id }, { $set: { qlikes: req.body.al } });
    res.status(200).send('Like removed successfully!');
  } catch (error) {
    res.send(error);
  }
};
