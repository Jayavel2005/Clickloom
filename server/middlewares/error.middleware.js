export const errorMiddleware = (err, req, res, next) => {
  console.error(err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    sucess: false,
    message: err.message || "Internal server error",
  });
};
