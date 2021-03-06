const express = require("express");
const speakingQuestionRouter = express.Router();

//get all
speakingQuestionRouter.get("/", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("testprep")
      .collection("speakingquestions")
      .find({})
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

//get one by id
speakingQuestionRouter.get("/:id", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("testprep")
      .collection("speakingquestions")
      .findOne({ id: req.params.id });

    const results = await req.dbClient
      .db("testprep")
      .collection("speakingquestions")
      .find({})
      .toArray();

    let previousId;
    let nextId;
    if (req.params.id === "4000") {
      previousId = "/testprep";
      nextId = String(parseInt(req.params.id) + 1);
    } else if (req.params.id === String(results.length - 1 + 4000)) {
      previousId = String(parseInt(req.params.id) - 1);
      nextId = "/testprep";
    } else {
      previousId = String(parseInt(req.params.id) - 1);
      nextId = String(parseInt(req.params.id) + 1);
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

module.exports = speakingQuestionRouter;
