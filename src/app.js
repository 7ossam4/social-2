require("express-async-errors"); 
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.use("/posts", require("./routes/post.routes"));
app.use("/comments", require("./routes/comment.routes"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/social_app")
  .then(() => app.listen(process.env.PORT || 3000, () => console.log("Server running")))
  .catch((e) => console.error("DB connection failed", e));
