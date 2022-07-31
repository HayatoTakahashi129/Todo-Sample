const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const { BuisnessException } = require("../../Errors/Exceptions");
const logger = require("../../Logger/Logger");
const { createFieldMessage } = require("../formatter/createFieldError");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

exports.validatorMiddleware = (schema) => (req, res, next) => {
  const validate = ajv.compile(schema);

  if (!validate(req.body)) {
    logger.debug(validate.errors);
    const fields = createFieldMessage(validate.errors);
    const type = "VALIDATION_ERROR";
    const message = "Validation Failed.";
    throw new BuisnessException(400, { type, message, fields }, [
      "Validation Failed",
      validate.errors,
    ]);
  }

  next();
};
