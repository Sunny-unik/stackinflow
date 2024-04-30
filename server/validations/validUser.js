const yup = require("yup");

const schemaProvider = {
  GET: {},
  POST: {
    "/dname": {
      schema: yup.object().shape({
        dname: yup.string().min(4).required()
      })
    },
    "/email": {
      schema: yup.object().shape({
        email: yup.string().min(5).required()
      })
    },
    "/": {
      schema: yup.object().shape({
        email: yup.string().min(5).max(50).required(),
        name: yup.string().min(2).max(46).required(),
        dname: yup.string().min(4).max(16).required(),
        password: yup.string().min(8).max(16).required()
      })
    },
    "/forgot-password": {
      schema: yup.object().shape({
        email: yup.string().min(4).required()
      })
    },
    "/login": {
      schema: yup.object().shape({
        email: yup.string().min(4).required(),
        password: yup.string().min(8).max(16).required()
      })
    }
  },
  PUT: {
    "/": {
      schema: yup.object().shape({
        id: yup.string().required(),
        name: yup.string().min(2).max(46).required(),
        dname: yup.string().min(4).max(16).required(),
        title: yup.string(),
        about: yup.string(),
        weblink: yup.string(),
        gitlink: yup.string(),
        twitter: yup.string(),
        address: yup.string()
      })
    },
    "/points": {
      schema: yup.object().shape({
        id: yup.string().required(),
        userpoint: yup.number().required()
      })
    },
    "/password": {
      schema: yup.object().shape({
        id: yup.string().required(),
        oldPassword: yup.string().min(8).max(16),
        newPassword: yup.string().min(8).max(16).required()
      })
    }
  }
};

const validUser = () => {
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

module.exports = validUser;
