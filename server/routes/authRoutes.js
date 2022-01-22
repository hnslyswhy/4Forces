const passport = require("passport");
const authRouter = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

authRouter.get("/login/success", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).json({
      message: "Successfully authenticate with OAuth provider",
      user: req.user,
      // cookies: req.cookies,
      // jwtToken:
    });
  }
  res.status(404);
});

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    message: "Login failed. Could not authenticate with OAuth provider",
  });
});

authRouter.get("/logout", (req, res) => {
  req.logOut();
  req.redirect(process.env.CLIENT_URL);
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
    console.log("roger1");
    console.log(req.user);
    res.redirect(`${process.env.CLIENT_URL}/#success`);
  }
);

module.exports = authRouter;
