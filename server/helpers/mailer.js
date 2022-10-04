const nodemailer = require('nodemailer');

sendMail = (from, appPassword, to, subject, htmlmsg) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: from,
      pass: appPassword,
    },
  });
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: htmlmsg,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ', info);
    }
  });
};

module.exports = sendMail;
