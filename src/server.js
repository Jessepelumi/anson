import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express();

mongoose
  .connect("mongodb://localhost/anson")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Error: ${error}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "jeolad-anson-express-tutorial",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running server at port ${PORT}`);
});

// app.get("/", (req, res) => {
//   console.log(req.session.id);
//   req.session.visited = true;

//   res.cookie("hello", "world", { maxAge: 60000 * 60 * 24, signed: true });
//   res.status(201).send("Welcome to Express.js server");
// });
