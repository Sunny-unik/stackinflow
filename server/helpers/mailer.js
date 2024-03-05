const nodemailer = require("nodemailer");

const sendMail = (from, appPassword, to, subject, htmlmsg) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: from, pass: appPassword }
    });
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: htmlmsg
    };
    transporter.sendMail(mailOptions, function (error, info) {
      error ? reject(error) : resolve(info);
    });
  });
};

module.exports = sendMail;
