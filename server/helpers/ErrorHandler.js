module.exports = function (
  error,
  path,
  responseObject,
  customMessage,
  statusCode
) {
  console.log("At:", path, "\nError:", error);

  responseObject
    .status(!statusCode || statusCode === 500 ? 500 : statusCode)
    .send({
      error: {
        message: customMessage
          ? customMessage
          : "Sorry, this service isn't working properly right now, try again later."
      }
    });
};
