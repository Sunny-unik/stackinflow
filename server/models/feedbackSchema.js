const { default: mongoose, Schema } = require('mongoose');

const feedbackSchema = new Schema({
  emailHead: {
    type: String,
    required: true,
  },
  emailBody: {
    type: String,
    required: true,
  },
  emailFoot: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

module.exports = mongoose.model('feedbacks', feedbackSchema);
