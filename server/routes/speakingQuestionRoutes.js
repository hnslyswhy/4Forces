const express = require("express");
const speakingQuestionRouter = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://hnslyswhy:47r8FLXi7k47@cluster0.5mivt.mongodb.net/HappyAviator?retryWrites=true&w=majority";


//get all
speakingQuestionRouter.get("/", async(req, res)=>{
      const client = new MongoClient(uri);
  try {
    await client.connect();
    const results = await client
      .db("testprep")
      .collection("speakingquestions")
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
})

//get one by id
speakingQuestionRouter.get("/:id", async(req, res)=>{
    const client = new MongoClient(uri);
    try{
       await client.connect();
       const result = await client.db("testprep").collection("speakingquestions").findOne({ _id: ObjectId.createFromHexString(req.params.id) });
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
})

module.exports = speakingQuestionRouter;