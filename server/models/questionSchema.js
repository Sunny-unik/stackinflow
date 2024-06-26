const { default: mongoose, Schema } = require("mongoose");

const questionSchema = new Schema(
  {
    question: {
      type: String,
      minLength: [4, "question title is too short!"],
      maxLength: 100,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("questions", questionSchema);
