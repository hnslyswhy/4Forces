const passport = require("passport");
const authRouter = require("express").Router();
const dotenv = require("dotenv");
const { ObjectId } = require("mongodb");

dotenv.config();

authRouter.get("/login/success", (req, res) => {
  if (!req.user) {
    res.status(404);
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
    res.redirect(`${process.env.CLIENT_URL}/#success`);
  }
);

/*************get user progress***********/
authRouter.get("/user/:id", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("aviator")
      .collection("userprogress")
      .findOne({ userId: ObjectId(req.params.id) });
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

/*************track user progress***********/
authRouter.patch("/user/:id", async (req, res) => {
  try {
    const result = await req.dbClient
      .db("aviator")
      .collection("userprogress")
      .findOne({ userId: ObjectId(req.params.id) });

    if (result) {
      await req.dbClient
        .db("aviator")
        .collection("userprogress")
        .updateOne(
          { userId: ObjectId(req.params.id) },
          {
            $push: {
              progress: {
                lastPage: req.body.page,
                timeStamp: Date.now(),
              },
            },
          }
        );

      res.status(200).json({ message: "User progress updated" });
    } else {
      const results = await req.dbClient
        .db("aviator")
        .collection("userprogress")
        .insertOne({
          username: req.body.username,
          userId: ObjectId(req.params.id),
          progress: [
            {
              lastPage: req.body.page,
              timeStamp: Date.now(),
            },
          ],
        });

      res.status(200).json({ message: "Start tracking user's progress" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
  }
});

module.exports = authRouter;
