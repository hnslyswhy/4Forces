const express = require("express");
const listeningQuestionRouter = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://hnslyswhy:47r8FLXi7k47@cluster0.5mivt.mongodb.net/HappyAviator?retryWrites=true&w=majority";


//get all 
listeningQuestionRouter.get("/", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const results = await client
      .db("testprep")
      .collection("listeningquestions")
      .find({ })
      .toArray();
    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

//get all act questions
listeningQuestionRouter.get("/radiocommunication", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const results = await client
      .db("testprep")
      .collection("listeningquestions")
      .find({ "type" :"radio_communication" })
      .toArray();
    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});


//get all atc questions
listeningQuestionRouter.get("/aviationscenario", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const results = await client
      .db("testprep")
      .collection("listeningquestions")
      .find({ "type" :"aviation_scenario" })
      .toArray();
    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});

// get one by id
listeningQuestionRouter.get("/:id", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await client
      .db("testprep")
      .collection("listeningquestions")
      .findOne({ _id: ObjectId.createFromHexString(req.params.id) });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
});




module.exports = listeningQuestionRouter;