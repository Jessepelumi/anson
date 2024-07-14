import bcrypt from "bcryptjs";

const saltrounds = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltrounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain, hashed) =>
  bcrypt.compareSync(plain, hashed);
