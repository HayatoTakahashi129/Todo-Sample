/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_TODOS_ARN
	STORAGE_TODOS_NAME
	STORAGE_TODOS_STREAMARN
Amplify Params - DO NOT EDIT */const AWS = require("aws-sdk");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");
const userRetrieverFromJWT = require("./systemUtils/Authentication/middleware/jwtUserReteriever");
const accessAllowHeader = require("./systemUtils/Authentication/middleware/accessControlAllow");
const { loggerMiddleware } = require("./systemUtils/ThreadLocal/ThreadStorage");
const {
  logError,
  knownErrorHandler,
  defaultErrorHandler,
} = require("./systemUtils/Errors/middleware/ErrorHandler");

AWS.config.update({ region: process.env.TABLE_REGION });

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(accessAllowHeader);
app.use(userRetrieverFromJWT("cognito:username"));
app.use(loggerMiddleware("X-Amzn-Trace-Id"));

// routes
app.use(require("./todos/todoController"));

// error handler
app.use(knownErrorHandler);
app.use(logError);
app.use(defaultErrorHandler);

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
