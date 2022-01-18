const { cloneNode } = require("domhandler");
const express = require("express");
const sentenceRouter = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://hnslyswhy:47r8FLXi7k47@cluster0.5mivt.mongodb.net/HappyAviator?retryWrites=true&w=majority";

/* //get all
sentenceRouter.get("/", async (req, res) => {
  // const client = new MongoClient(uri);
  try {
    //    await client.connect();
    //   const results = await client
    req.dbClient.db("testprep").collection("sentences").find({}).toArray();
    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    // } finally {
    //    await client.close();
    //  }
  }
}); */

//get all intermediate level
sentenceRouter.get("/advanced", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("testprep")
      .collection("sentences")
      .find({ level: "advanced" })
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
});

//get all intermediate level
sentenceRouter.get("/intermediate", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("testprep")
      .collection("sentences")
      .find({ level: "intermediate" })
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
});

//get all entry level
sentenceRouter.get("/entry", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("testprep")
      .collection("sentences")
      .find({ level: "entry" })
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
});

/* // get one by id
// :id will take all the routes, thus need to stay in the end
sentenceRouter.get("/:id", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("testprep")
      .collection("sentences")
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

module.exports = sentenceRouter;
