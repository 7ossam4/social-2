const mongoose = require("mongoose");

module.exports = (...params) => (req, res, next) => {
  for (const p of params) {
    if (!mongoose.isValidObjectId(req.params[p])) {
      return res.status(400).json({ message: `Invalid ${p}` });
    }
  }
  next();
};
