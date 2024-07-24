import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import {
  newUserValidation,
  queryValidationSchema,
} from "../utils/validation_schema.js";
import { User } from "../mongoose/schema/users.js";
import { hashPassword } from "../utils/helpers.js";

const router = Router();

router.get(
  "/api/users",
  checkSchema(queryValidationSchema, ["query"]),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });

    const { filter, value } = matchedData(req);

    try {
      if (filter && value) {
        const filteredUsers = await User.find({
          [filter]: new RegExp(value, "i"),
        });
        return res.status(200).send(filteredUsers);
      }

      const allUsers = await User.find({});
      return res.status(200).send(allUsers);
    } catch (error) {
      return res.status(500).send({ error: "Error fetching users" });
    }
  }
);

router.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;

  const singleUser = await User.findOne({ username });
  if (!singleUser) return res.sendStatus(404);
  return res.status(200).send(singleUser);
});

router.post(
  "/api/users",
  checkSchema(newUserValidation, ["body"]),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });

    const data = matchedData(req);
    data.password = hashPassword(data.password);

    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
);

router.put("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    if (updates.password) {
      updates.password = hashPassword(updates.password);
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: updates },
      { new: true, runValidators: true }
    );

    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send("Error updating user");
  }
});

router.patch("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  const updates = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    if (updates.password) {
      updates.password = hashPassword(updates.password);
    }

    user = await User.findOneAndUpdate(
      { username },
      { $set: updates },
      { new: true, runValidators: true }
    );

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send("Error updating user");
  }
});

router.delete("/api/users/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) return res.status(404).send("User not found");
    return res.status(200).send("User deleted successfully");
  } catch (error) {
    return res.status(500).send("Error deleting user");
  }
});

export default router;
