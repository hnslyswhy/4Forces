const express = require("express");
const listeningQuestionRouter = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://hnslyswhy:47r8FLXi7k47@cluster0.5mivt.mongodb.net/HappyAviator?retryWrites=true&w=majority";

/* //get all
listeningQuestionRouter.get("/", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("testprep")
      .collection("listeningquestions")
      .find({})
      .toArray();
    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
  } finally {
  }
}); */

//get all act questions
listeningQuestionRouter.get("/radiocommunication", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("testprep")
      .collection("listeningquestions")
      .find({ type: "radio_communication" })
      .toArray();
    if (results.length !== 0) {
      console.log(results);
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
  } finally {
  }
});

//get all atc questions
listeningQuestionRouter.get("/aviationscenario", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("testprep")
      .collection("listeningquestions")
      .find({ type: "aviation_scenario" })
      .toArray();
    if (results.length !== 0) {
      console.log(results);
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
  } finally {
  }
});

/* // get one by id
listeningQuestionRouter.get("/:id", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("testprep")
      .collection("listeningquestions")
      .findOne({ id: req.params.id });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
  } finally {
  }
}); */

module.exports = listeningQuestionRouter;
