const { default: mongoose, Schema } = require('mongoose');

const answerSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  alikes: {
    type: Array,
    default: [],
  },
  qid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questions',
    required: true,
  },
});

module.exports = mongoose.model('answers', answerSchema);
