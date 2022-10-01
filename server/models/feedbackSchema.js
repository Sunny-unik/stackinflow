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
    type: Array,
  },
  userEmail: {
    type: Array,
    required: true,
  },
  userName: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('feedbacks', feedbackSchema);
