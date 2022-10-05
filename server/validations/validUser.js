const yup = require("yup");

const schemaProvider = {
  GET: {
    "/login": {
      schema: yup.object().shape({
        email: yup.string().min(4).required(),
        password: yup.string().min(8).max(16).required()
      })
    },
    "/dname": {
      schema: yup.object().shape({
        dname: yup.string().min(4).required(),
        id: yup.string().required()
      })
    },
    "/email": {
      schema: yup.object().shape({
        email: yup.string().min(5).required(),
        id: yup.string().required()
      })
    },
    "/otp-mail": {
      schema: yup.object().shape({
        email: yup.string().min(4).required()
      })
    }
  },
  POST: {
    "/": {
      schema: yup.object().shape({
        email: yup.string().min(5).max(50).required(),
        name: yup.string().min(2).max(46).required(),
        dname: yup.string().min(4).max(16).required(),
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
        title: yup.string().required(),
        about: yup.string().required(),
        weblink: yup.string().required(),
        gitlink: yup.string().required(),
        twitter: yup.string().required(),
        address: yup.string().required()
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
        oldPassword: yup.string().min(8).max(16).required(),
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
