import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running server at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(201).send("Welcome to Express.js server");
});
