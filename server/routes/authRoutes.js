const passport = require("passport");
const authRouter = require("express").Router();
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");

dotenv.config();

authRouter.get("/login/success", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    res.json("Not authenticated");
  } else {
    req.user.then((userData) => {
      if (userData) {
        res.status(200).json({
          message: "Successfully authenticate with OAuth provider",
          user: userData,
          // cookies: req.cookies,
          // jwtToken:
        });
      }
    });
  }
});

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    message: "Login failed. Could not authenticate with OAuth provider",
  });
});

authRouter.get("/logout", (req, res) => {
  req.logOut();
  res.redirect(process.env.CLIENT_URL);
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRouter.get(
  "/redirect/google",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect(`${process.env.CLIENT_URL}/home`);
  }
);

/************* user progress ***********/
//update user progress
authRouter.patch("/user/:userId/progress/:questionId", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("aviator")
      .collection("userprogress")
      .updateOne(
        {
          userId: req.params.userId,
          questionId: req.params.questionId,
        },
        {
          $set: {
            userId: req.params.userId,
            questionId: req.params.questionId,
            lastPage: req.body.page,
            timestamp: Date.now(),
          },
        },
        {
          upsert: true,
        }
      );
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

/// get all comments of a user
authRouter.get("/user/:userId/comments", async (req, res) => {
  try {
    const results = await req.dbClient
      .db("resource")
      .collection("comments")
      .find({ userId: req.params.userId })
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

////get user progress
authRouter.get("/user/:id", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("aviator")
      .collection("userprogress")
      .find({ userId: req.params.id })
      .sort({ timestamp: -1 })
      .toArray();

    let userProgress = {
      userId: req.params.id,
      progress: result,
    };

    if (userProgress) {
      res.status(200).json(userProgress);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

module.exports = authRouter;
