export default function errorHandler(err, req, res, next) {
  console.error(err);

  if (!err.status) {
    if (process.env.ENV === 'production') {
      return res.status(500).json({
        error: {
          message: 'An internal server happen.',
        },
      });
    }

    return res.status(500).json({
      err,
    });
  }

  res.status(err.status).json({
    error: {
      ...err,
    },
  });
}
