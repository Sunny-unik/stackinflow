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
      default: 0,
      min: 0
    }
  },
  { timestamps: true }
);

tagSchema.pre("updateOne", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (docToUpdate.questionsCount + this.getUpdate().$inc.questionsCount < 0) {
    const err = new Error(
      "Updating questionsCount would result in a negative value"
    );
    return next(err);
  }
  next();
});

module.exports = mongoose.model("tags", tagSchema);
