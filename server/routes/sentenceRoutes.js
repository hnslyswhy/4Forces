const { cloneNode } = require("domhandler");
const express = require("express");
const sentenceRouter = express.Router();

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
    //   throw new Error(e);
    res.status(500).json({ message: "Something went wrong" });
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
    //  throw new Error(e);
    res.status(500).json({ message: "Something went wrong" });
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
    // throw new Error(e);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

// get one by id
// :id will take all the routes, thus need to stay in the end
sentenceRouter.get("/:id", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("testprep")
      .collection("sentences")
      .findOne({ id: req.params.id });

    const levelData = await req.dbClient
      .db("testprep")
      .collection("sentences")
      .find({ level: result.level })
      .toArray();

    let targetIndex = levelData.findIndex(
      (sentence) => sentence.id === req.params.id
    );

    let previousId;
    let nextId;
    if (targetIndex === 0) {
      previousId = "/testprep";
      nextId = levelData[targetIndex + 1].id;
    } else if (targetIndex === levelData.length - 1) {
      previousId = levelData[targetIndex - 1].id;
      nextId = "/testprep";
    } else {
      previousId = levelData[targetIndex - 1].id;
      nextId = levelData[targetIndex + 1].id;
    }

    result["previousId"] = previousId;
    result["nextId"] = nextId;
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    //  throw new Error(e);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

module.exports = sentenceRouter;
