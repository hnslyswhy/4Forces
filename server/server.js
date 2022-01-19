const { json } = require("express");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sentenceRouter = require("./routes/sentenceRoutes");
const listeningQuestionRouter = require("./routes/listeningQuestionRoutes");
const speakingQuestionRouter = require("./routes/speakingQuestionRoutes");
const resourceRouter = require("./routes/resourceRoutes");

// mongo
//reference video: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
const { MongoClient } = require("mongodb");

let client;
async function main() {
  const uri =
    "mongodb+srv://hnslyswhy:47r8FLXi7k47@cluster0.5mivt.mongodb.net/HappyAviator?retryWrites=true&w=majority";
  client = new MongoClient(uri);
  // connect to cluster
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
app.use(cors());
app.use(express.json());
//// mongodb
app.use((req, res, next) => {
  req.dbClient = client;
  next();
});

//routes
app.use("/sentences", sentenceRouter);
app.use("/listeningquestions", listeningQuestionRouter);
app.use("/speakingquestions", speakingQuestionRouter);
app.use("resource", resourceRouter);

//port
app.listen(process.env.PORT || 5050, () => {
  console.log(`🚀 Server listening on ${process.env.PORT}`);
});
