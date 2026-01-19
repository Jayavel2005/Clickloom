import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { JWT_SECRET } from "../config/env";

export const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) throw new ApiError(401, "Authentication required");

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: decoded._id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    next(new ApiError(401, "Invalid oe expired token"));
  }
};
