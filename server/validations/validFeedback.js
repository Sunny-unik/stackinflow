const yup = require("yup");

const validFeedback = () => {
  return async (req, res, next) => {
    try {
      const schema = yup.object().shape({
        title: yup.string().min(4).max(72).required(),
        description: yup.string().min(5).max(1000).required(),
        userId: yup.string().required()
      });
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      res.send(err);
    }
  };
};

module.exports = validFeedback;
