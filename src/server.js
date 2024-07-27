import { createApp } from "./createApp.js";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/anson")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Error: ${error}`));

const app = createApp();

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

// client secret - qLYEOJGVkzIiM5jNbgOgKtCxpiE2TplI
// client id - 1265638466423881905
