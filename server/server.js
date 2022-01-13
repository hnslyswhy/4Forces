const { json } = require("express");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sentenceRouter = require("./routes/sentenceRoutes");
const listeningQuestionRouter = require("./routes/listeningQuestionRoutes");
const speakingQuestionRouter = require("./routes/speakingQuestionRoutes");

// mongo
const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://hnslyswhy:47r8FLXi7k47@cluster0.5mivt.mongodb.net/HappyAviator?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  // connect to cluster
  try {
    await client.connect();
    // await getDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

/* // get a list of databases
async function getDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("databases");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}

 */

const app = express();
dotenv.config();

// middle
app.use(cors());
app.use(express.json());

//routes
app.use("/sentences", sentenceRouter);
app.use("/listeningquestions", listeningQuestionRouter);
app.use("/speakingquestions", speakingQuestionRouter)

//port
app.listen(process.env.PORT || 5050, () => {
  console.log(`🚀 Server listening on ${process.env.PORT}`);
});
