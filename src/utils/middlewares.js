//import { users } from "../static/users.js";
import { User } from "../mongoose/schema/users.js";

export const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { username },
  } = req;

  // const parsedId = parseInt(id);
  // if (isNaN(parsedId)) return res.sendStatus(400);

  //const findUserIndex = users.findIndex((user) => user.id === parsedId);
  const findUser = User.findOne(username);
  if (!findUser) return res.sendStatus(404);
  req.findUser = findUser;
  next();
};
