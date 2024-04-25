const yup = require("yup");

const schemaProvider = {
  POST: {
    "/": {
      schema: yup.object().shape({
        question: yup.string().min(4).max(150).required(),
        userId: yup.string().required(),
        questiondetail: yup.string().min(5).max(5000).required()
      })
    }
  },
  PUT: {
    "/": {
      schema: yup.object().shape({
        id: yup.string().required(),
        question: yup.string().min(4).max(100).required(),
        tags: yup.array().required(),
        questionDetail: yup.string().min(5).max(1080).required()
      })
    },
    "/add-like": {
      schema: yup.object().shape({
        id: yup.string().required(),
        userId: yup.string().required()
      })
    },
    "/remove-like": {
      schema: yup.object().shape({
        id: yup.string().required(),
        qlikes: yup.array().required()
      })
    }
  }
};

const validQuestion = () => {
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

module.exports = validQuestion;
