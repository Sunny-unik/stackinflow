const { default: mongoose, Schema } = require("mongoose");

const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  questiondetail: {
    type: String,
    minLength: [5, "question description is too short!"],
    maxLength: 1080,
    required: true
  },
  qlikes: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answers"
    }
  ],
  tags: { type: Array, default: [] }
});

module.exports = mongoose.model("questions", questionSchema);
