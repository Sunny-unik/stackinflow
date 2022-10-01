const { default: mongoose, Schema } = require('mongoose');

const answerSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
    required: true,
  },
  answer: {
    type: Array,
    required: true,
  },
  alikes: {
    type: Array,
    default: [],
  },
  qid: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('answers', answerSchema);
