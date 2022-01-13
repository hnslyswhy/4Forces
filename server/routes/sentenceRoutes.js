const { cloneNode } = require("domhandler");
const express = require("express");
const sentenceRouter = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://hnslyswhy:47r8FLXi7k47@cluster0.5mivt.mongodb.net/HappyAviator?retryWrites=true&w=majority";

 //get all 
sentenceRouter.get("/", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const results = await client
      .db("testprep")
      .collection("sentences")
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

  //get all intermediate level
sentenceRouter.get("/advanced", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const results = await client
      .db("testprep")
      .collection("sentences")
      .find({ "level": "advanced" })
      .toArray();

      console.log("##### advanced level sentence count : ", results.length)

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


  //get all intermediate level
sentenceRouter.get("/intermediate", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const results = await client
      .db("testprep")
      .collection("sentences")
      .find({ "level": "intermediate" })
      .toArray();

      console.log("##### intermediate level sentence count : ", results.length)

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


  //get all entry level
sentenceRouter.get("/entry", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const results = await client
      .db("testprep")
      .collection("sentences")
      .find({ "level": "entry" })
      .toArray();

      console.log("##### entrylevel sentence count : ", results.length)

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
// :id will take all the routes, thus need to stay in the end
sentenceRouter.get("/:id", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await client
      .db("testprep")
      .collection("sentences")
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




module.exports = sentenceRouter;
