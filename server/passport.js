const passport = require("passport");
const dotenv = require("dotenv");
let GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("i logged in");
      let user = findOrCreateUser("google", profile);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  user.then((userData) => {
    // This callback expects a user.id.
    // See stackoverflow: https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
    cb(null, userData.id);
  });
});

passport.deserializeUser((userId, cb) => {
  let user = findOrCreateUser("google", { id: userId });
  cb(null, user);
});

// mongo
//reference video: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
const { MongoClient } = require("mongodb");

/************************/
const findOrCreateUser = async (issuer, profile) => {
  const uri =
    "mongodb+srv://hnslyswhy:47r8FLXi7k47@cluster0.5mivt.mongodb.net/HappyAviator?retryWrites=true&w=majority";
  client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await client
      .db("aviator")
      .collection(issuer)
      .findOne({ id: profile.id });

    if (!result) {
      const creatResult = await client
        .db("aviator")
        .collection(issuer)
        .insertOne(profile);

      return creatResult;
    } else {
      return result;
    }
  } catch (e) {
    console.error(e);
  } finally {
  }
  const result = await client
    .db("aviator")
    .collection(issuer)
    .findOne({ id: profile.id });

  if (!result) {
    const creatResult = await req.dbClient
      .db("aviator")
      .collection(issuer)
      .insertOne(profile);

    return creatResult;
  } else {
    return result;
  }
};
