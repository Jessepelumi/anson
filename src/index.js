import express from "express";
import usersRouter from "./routes/users_api.js";

const app = express();

app.use(express.json());
app.use(usersRouter);

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Express.js");
});

app.listen(PORT, () => {
  console.log(`Running server at port ${PORT}`);
});
