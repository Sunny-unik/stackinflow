const yup = require("yup");

const schemaProvider = {
  POST: {
    "/": {
      schema: yup.object().shape({
        answer: yup.string().min(5).max(720).required(),
        userId: yup.string().required(),
        qid: yup.string().required()
      })
    }
  },
  PUT: {
    "/add-like": {
      schema: yup.object().shape({
        id: yup.string().required(),
        userId: yup.string().required()
      })
    },
    "/remove-like": {
      schema: yup.object().shape({
        id: yup.string().required(),
        alikes: yup.array().required()
      })
    }
  }
};

const validAnswer = () => {
  return async (req, res, next) => {
    try {
      const model = schemaProvider[req.method][req.url];
      await model.schema.validate(
        req.body,
        model.options || { abortEarly: false }
      );
      next();
    } catch (err) {
      res.send(err);
    }
  };
};

module.exports = validAnswer;