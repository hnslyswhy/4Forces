const express = require("express");
const listeningQuestionRouter = express.Router();

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
        throw new Error(e);
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
    throw new Error(e);
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
    throw new Error(e);
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
      previousId = "";
      nextId = typeData[targetIndex + 1].id;
    } else if (targetIndex === typeData.length - 1) {
      previousId = typeData[targetIndex - 1].id;
      nextId = "";
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
    console.error(e);
    throw new Error(e);
  } finally {
  }
});

module.exports = listeningQuestionRouter;
