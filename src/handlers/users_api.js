import { User } from "../mongoose/schema/users.js";
import { matchedData, validationResult } from "express-validator";
import { hashPassword } from "../utils/helpers.js";

export const getUsersByUsernameHandler = async (req, res) => {
  const { username } = req.params;

  const singleUser = await User.findOne({ username });
  if (!singleUser) return res.sendStatus(404);
  return res.status(200).send(singleUser);
};

export const createUserHandler = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());

  const data = matchedData(req);
  data.password = hashPassword(data.password);

  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (error) {
    return res.sendStatus(400);
  }
};
