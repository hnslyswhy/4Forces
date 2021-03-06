const { json } = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

const passportSetup = require("./passport");
const authRouter = require("./routes/authRoutes");
const sentenceRouter = require("./routes/sentenceRoutes");
const listeningQuestionRouter = require("./routes/listeningQuestionRoutes");
const speakingQuestionRouter = require("./routes/speakingQuestionRoutes");
const resourceRouter = require("./routes/resourceRoutes");

// mongo
//reference video: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
const { MongoClient } = require("mongodb");

let client;
async function main() {
  const uri = process.env.MONGODB_URL;
  const options = {
    sslValidate: false,
  };
  client = new MongoClient(uri, options);
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
  }
}

main().catch(console.error);

const app = express();
dotenv.config();

// middle
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);
app.use(express.json());

/// http header middleware
app.use(helmet());

/// morgan logger
app.use(morgan("dev"));

//// mongodb
app.use((req, res, next) => {
  req.dbClient = client;
  next();
});

///cookie session maxAge: max duration 1 day
app.use(
  cookieSession({
    name: "session",
    keys: ["ann"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

/// passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/sentences", sentenceRouter);
app.use("/listeningquestions", listeningQuestionRouter);
app.use("/speakingquestions", speakingQuestionRouter);
app.use("/resource", resourceRouter);
app.use("/auth", authRouter);

//port
app.listen(process.env.PORT || 5050, () => {
  console.log(`🚀 Server listening on ${process.env.PORT}`);
});
