const yup = require("yup");

const schemaProvider = {
  DELETE: {
    "/": {
      schema: yup.object().shape({
        id: yup.string().required()
      })
    }
  },
  POST: {
    "/": {
      schema: yup.object().shape({
        question: yup.string().min(4).max(100).required(),
        userId: yup.string().required(),
        questiondetail: yup.string().min(5).max(1080).required()
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
    },
    "/add-answer": {
      schema: yup.object().shape({
        qid: yup.string().required(),
        answerId: yup.string().required()
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
