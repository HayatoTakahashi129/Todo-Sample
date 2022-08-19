const logger = require("../../Logger/Logger");

const defauleErrors = {
  required: "${0} is required.",
  maximum: "${0} is need to be lower than ${1}.",
  minimum: "${0} is need to be larger than ${1}.",
  maxLength: "${0} is need to be shorter than ${1} characters.",
  minLength: "${0} is need to be longer than ${1} characters.",
  format: "${0} must be ${1} format.",
};

const getKey = (error) => {
  return (
    error.instancePath.substr(error.instancePath.lastIndexOf("/") + 1) ||
    error.params.missingProperty
  );
};

const messageTemplate = (string, ...values) => {
  let result = string;
  values.forEach((value, i) => {
    result = result.replace(`\${${i}}`, value);
  });
  return result;
};

const getMessage = (key, error) => {
  logger.debug(key, error);
  const message = defauleErrors[error.keyword];
  logger.debug(message);
  switch (error.keyword) {
    case "maximum":
    case "minimum":
    case "maxLength":
    case "minLength":
      return messageTemplate(message, key, error.params.limit);
    case "format":
      return messageTemplate(message, key, error.params.format);
    default:
      return messageTemplate(message, key);
  }
};

exports.createFieldMessage = (errors) => {
  let fields = [];
  errors.forEach((err) => {
    const key = getKey(err);
    fields.push({ [key]: getMessage(key, err) });
  });
  return fields;
};
