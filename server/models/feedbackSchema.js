const { default: mongoose, Schema } = require("mongoose");

const feedbackSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  conclusion: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

module.exports = mongoose.model("feedbacks", feedbackSchema);
