const express = require("express");
const resourceRouter = express.Router();

const { ObjectId, Timestamp } = require("mongodb");

//get all video resource
resourceRouter.get("/video", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("resource")
      .collection("resource")
      .find({ type: "video" })
      .sort({ views: -1 })
      .toArray();

    if (results.length !== 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    // throw new Error(e);
    res.status(500).json({ message: "Something went wrong" });
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
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

// get one by id
resourceRouter.get("/:id", async (req, res) => {
  try {
    //  update the views
    const updateResult = await req.dbClient
      .db("resource")
      .collection("resource")
      .updateOne({ _id: ObjectId(req.params.id) }, { $inc: { views: 1 } });

    // find the target
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
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

/*************************************************************/
//// get update likes of a resource
resourceRouter.patch("/:id/likes", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("resource")
      .collection("resource")
      .updateOne(
        { _id: ObjectId(req.params.id) },
        { $inc: { likes: req.body.increment } }
      );

    if (result) {
      res
        .status(200)
        .json(`${result.modifiedCount} document(s) was/were updated.`);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

///edit a comment
resourceRouter.patch("/:resourceId/comments/:commentId", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("resource")
      .collection("comments")
      .updateOne(
        {
          resourceId: req.params.resourceId,
          _id: ObjectId(req.params.commentId),
        },
        {
          $set: {
            content: req.body.content,
          },
        }
      );
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

/// create a comment of a resource
resourceRouter.post("/:resourceId/comments", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("resource")
      .collection("comments")
      .updateOne(
        {
          resourceId: ObjectId(req.params.resourceId),
          userId: req.body.userId,
        },
        {
          $set: {
            resourceId: req.params.resourceId,
            userId: req.body.userId,
            username: req.body.username,
            avatar: req.body.avatar,
            content: req.body.content,
            commentPage: req.body.commentPage,
            timestamp: Date.now(),
          },
        },
        { upsert: true }
      );

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

/// get all comments of a resource
resourceRouter.get("/:resourceId/comments", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("resource")
      .collection("comments")
      .find({ resourceId: req.params.resourceId })
      .sort({ timestamp: -1 })
      .toArray();

    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

//// delete a comment of a resource
resourceRouter.delete("/:resourceId/comments/:commentId", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("resource")
      .collection("comments")
      .deleteOne({
        _id: ObjectId(req.params.commentId),
      });

    if (result) {
      res
        .status(200)
        .json(`${result.modifiedCount} document(s) was/were deleted.`);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

module.exports = resourceRouter;
