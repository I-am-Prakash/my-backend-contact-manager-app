const { constants } = require("../constants");

errorHandler = (err, req, res, next) => {
  console.error('Error handler called:', err);
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(`The error status is ${statusCode}`);
  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        Title: "Not Found",
        Error: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        Title: "Forbidden",
        Error: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        Title: "Bad Request",
        Error: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        Title: "Not Authorized",
        Error: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        Title: "Server error",
        Error: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log(`No error All good `);
      break;
  }
};

module.exports = errorHandler;
