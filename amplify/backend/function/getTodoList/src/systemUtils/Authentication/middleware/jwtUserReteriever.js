const jwt = require("jsonwebtoken");

const userRetrieverFromJWT = (claimKey) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader) {
      const token = authHeader.includes("Bearer")
        ? authHeader.split(" ")[1]
        : authHeader;
      if (!token) next();

      const decoded = jwt.decode(token, { json: true });
      req.userId = decoded[claimKey];
    }
    next();
  };
};

module.exports = userRetrieverFromJWT;
