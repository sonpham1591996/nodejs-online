const Joi = require("joi");

const validators = {
  blogDTO: Joi.object().keys({
    name: Joi.string().required().min(8).max(120),
    category: Joi.string().required().min(8).max(120),
  }),
};

const validator = (validatorName, callback) => {
  return async function (req, res, next) {
    if (!validators[validatorName]) {
      return res.status(500).send();
    }

    const { error } = validators[validatorName].validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      let obj = {};
      for (let errObj of error.details) {
        obj[errObj.path[0]] = errObj.message;
      }

      if (Object.keys(obj).length > 0) {
        return callback(res, obj);
      }
    }
    return next();
  };
};

const validatorForWebService = (validatorName) => {
  return validator(validatorName, (res, obj) => {
    return res.status(400).json(obj);
  });
};
/**
 * Validate for web server
 *
 * @param {*} validatorName
 * @param {*} fileName
 * @return {*}
 */
const validatorForWebServer = (validatorName, fileName) => {
  return validator(validatorName, (res, obj) => {
    return res.render(fileName, { errorMsg: obj });
  });
};

module.exports = { validatorForWebService, validatorForWebServer };
