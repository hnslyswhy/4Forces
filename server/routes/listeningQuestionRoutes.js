const express = require("express");
const listeningQuestionRouter = express.Router();

//get all act questions
listeningQuestionRouter.get("/radiocommunication", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("testprep")
      .collection("listeningquestions")
      .find({ type: "radio_communication" })
      .toArray();
    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
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
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

// get one by id
listeningQuestionRouter.get("/:id", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("testprep")
      .collection("listeningquestions")
      .findOne({ id: req.params.id });

    const typeData = await req.dbClient
      .db("testprep")
      .collection("listeningquestions")
      .find({ type: result.type })
      .toArray();

    let targetIndex = typeData.findIndex(
      (question) => question.id === req.params.id
    );

    let previousId;
    let nextId;
    if (targetIndex === 0) {
      previousId = "/testprep";
      nextId = typeData[targetIndex + 1].id;
    } else if (targetIndex === typeData.length - 1) {
      previousId = typeData[targetIndex - 1].id;
      nextId = "/testprep";
    } else {
      previousId = typeData[targetIndex - 1].id;
      nextId = typeData[targetIndex + 1].id;
    }

    result["previousId"] = previousId;
    result["nextId"] = nextId;

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

module.exports = listeningQuestionRouter;
