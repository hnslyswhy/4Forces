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
    //  throw new Error(e);
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
    console.error(e);
    //  throw new Error(e);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

/*************************************************************/
//// get update likes of a resource
resourceRouter.patch("/:id/likes", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body.increment);
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
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

//// update a comment
/* resourceRouter.patch("/:resourceId/comments/:commentId", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("resource")
      .collection("resource")
      .updateOne(
        {
          _id: ObjectId(req.params.resourceId),
        },
        {
          $set: {
            "comments.$[elem].content": req.body.content,
            "comments.$[elem].timestamp": Date.now(),
          },
        },
        { arrayFilters: [{ "elem.id": { $eq: req.params.commentId } }] }
      );

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
}); */

/// create a comment of a resource
resourceRouter.post("/:resourceId/comments", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("resource")
      .collection("resource")
      .updateOne(
        {
          _id: ObjectId(req.params.resourceId),
        },
        {
          $push: {
            comments: {
              id: req.body.id,
              content: req.body.content,
              timeStamp: Date.now(),
              avatar:
                "https://happyaviationenglish.sfo3.digitaloceanspaces.com/images/background.jpg",
              username: req.body.username,
            },
          },
        }
      );

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

//// delete a comment of a resource
resourceRouter.delete("/:resourceId/comments/:commentId", async (req, res) => {
  try {
    console.log(req.params.commentId);
    const result = await req.dbClient
      .db("resource")
      .collection("resource")
      .updateOne(
        {
          _id: ObjectId(req.params.resourceId),
        },
        {
          $pull: {
            comments: {
              id: req.params.commentId,
            },
          },
        }
      );

    if (result) {
      res
        .status(200)
        .json(`${result.modifiedCount} document(s) was/were deleted.`);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

module.exports = resourceRouter;
