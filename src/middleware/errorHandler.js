module.exports = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    if (process.env.NODE_ENV === "production") {
      return res.status(400).json(error.message);
    } else {
      return res.status(400).json(error.errors);
    }
  }

  console.error(error);
  return res.status(500).json("something unexpected happened, please contact");
};
