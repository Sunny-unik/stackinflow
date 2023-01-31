const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const questionRoutes = require("./routes/questionRoutes");
const userRoutes = require("./routes/userRoutes");
const answerRoutes = require("./routes/answerRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const cookieParser = require("cookie-parser");
dotenv.config();

app.use(
  cors({
    origin: "https://astonishing-froyo-77fd08.netlify.app",
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads/userProfiles")));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Databse Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`Error on connection: `, err);
});

app.use("/question", questionRoutes);
app.use("/user", userRoutes);
app.use("/answer", answerRoutes);
app.use("/", feedbackRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`live on http://localhost:${port}`));
