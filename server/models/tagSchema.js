const { default: mongoose, Schema } = require("mongoose");

const tagSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [1, "Tag is too short!"],
      maxLength: [36, "Tag is too long!"],
      required: true
    },
    detail: {
      type: String,
      maxLength: [500, "Tag detail is too long!"],
      default: ""
    },
    questionsCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("tags", tagSchema);
