const express = require("express");
const resourceRouter = express.Router();

const { ObjectId } = require("mongodb");

//get all video resource
resourceRouter.get("/video", async (req, res) => {
  console.log("hi");
  try {
    const results = await req.dbClient
      .db("resource")
      .collection("resource")
      .find({ type: "video" })
      .toArray();

    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  } finally {
  }
});

//get all document resource
resourceRouter.get("/doc", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("resource")
      .collection("resource")
      .find({ type: "doc" })
      .toArray();

    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  } finally {
  }
});

// get one by id
resourceRouter.get("/:id", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("resource")
      .collection("resource")
      .findOne({ _id: ObjectId(req.params.id) });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  } finally {
  }
});

module.exports = resourceRouter;
