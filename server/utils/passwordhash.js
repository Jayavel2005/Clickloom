import bcrypt from "bcrypt";
import { SALT } from "../config/env.js";

export const encryptPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const checkUser = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
