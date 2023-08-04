const { checkSchema } = require("express-validator");

const validators = {
  blogDTO: checkSchema({
    name: {
      notEmpty: { errorMessage: "Name is required" },
      isLength: {
        options: { min: 8, max: 120 },
        errorMessage:
          "The length of name is greater than 8 characters and less than 120 characters",
      },
    },
    category: {
      notEmpty: { errorMessage: "category is required" },
      isLength: {
        options: { min: 8, max: 120 },
        errorMessage:
          "The length of category is greater than 8 characters and less than 120 characters",
      },
    },
  }),
};

const validator = (validatorName, callback) => {
  return async function (req, res, next) {
    if (!validators[validatorName]) {
      return res.status(500).send();
    }

    const result = await validators[validatorName].run(req);

    let errorMsg = undefined;

    for (let obj of result) {
      if (!errorMsg) {
        errorMsg = {};
      }
      if (obj.errors[0]) {
        errorMsg[obj.errors[0].path] = obj.errors[0].msg;
      }
    }

    if (Object.keys(errorMsg).length > 0) {
      return callback(res, errorMsg);
    }
    return next();
  };
};

const expressValidatorForWebService = (validatorName) => {
  return validator(validatorName, (res, errorMsg) => {
    return res.status(400).json(errorMsg);
  });
};

const expressValidatorForWebServer = (validatorName, fileName) => {
  return validator(validatorName, (res, errorMsg) => {
    return res.render(fileName, { errorMsg });
  });
};

module.exports = {
  expressValidatorForWebService,
  expressValidatorForWebServer,
};
