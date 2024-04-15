const { default: mongoose, Schema } = require("mongoose");

const requestSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, default: [] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("requests", requestSchema);
