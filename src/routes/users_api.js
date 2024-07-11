import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import {
  userValidationSchema,
  queryValidationSchema,
} from "../utils/validation_schema.js";
import { users } from "../static/users.js";
import { resolveIndexByUserId } from "../utils/middlewares.js";

const router = Router();

router.get(
  "/api/users",
  checkSchema(queryValidationSchema, ["query"]),
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });

    const { filter, value } = matchedData(req);

    if (filter && value) {
      const filteredUsers = users.filter((user) =>
        user[filter]?.includes(value)
      );
      return res.status(200).send(filteredUsers);
    }

    return res.status(200).send(users);
  }
);

router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  const singleUser = users[findUserIndex];
  if (!singleUser) return res.sendStatus(404);
  return res.status(200).send(singleUser);
});

router.post(
  "/api/users",
  checkSchema(userValidationSchema, ["body"]),
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });

    const data = matchedData(req);
    const newUser = { id: users[users.length - 1].id + 1, ...data };
    users.push(newUser);
    res.status(201).send(newUser);
  }
);

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  const parsedId = users[findUserIndex].id;
  users[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  users[findUserIndex] = { ...users[findUserIndex], ...body };
  return res.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  users.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
