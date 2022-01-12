const { json } = require("express");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sentenceRouter = require("./routes/sentenceRoute");
const questionRouter = require("./routes/questionRoutes");

const app = express();
dotenv.config();

// middle
app.use(cors());
app.use(express.json());

//routes
app.use("/sentences", sentenceRouter);
app.use("/questions", questionRouter);

//port
app.listen(process.env.PORT || 5050, () => {
  console.log(`🚀 Server listening on ${process.env.PORT}`);
});
