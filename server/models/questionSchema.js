const { default: mongoose, Schema } = require('mongoose');

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  questiondetail: {
    type: String,
    minLength: [5, 'question description is too short!'],
    maxLength: 46,
    required: true,
  },
  qlikes: {
    type: Array,
    default: [],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    maxLength: 16,
    required: true,
  },
  userdname: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'answers',
    },
  ],
  tags: { type: Array, default: [] },
});

module.exports = mongoose.model('questions', questionSchema);
