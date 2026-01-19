import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { checkUser, encryptPassword } from "../utils/passwordhash.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) throw new ApiError(400, "Name must be present");
    if (!email) throw new ApiError(400, "Email must be present");
    if (!password) throw new ApiError(400, "Password is required");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(409, "User already registered");

    const encryptedPassword = await encryptPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User successfully created",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new ApiError(400, "Email must be present");
    if (!password) throw new ApiError(400, "Password must be present");

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) throw new ApiError(404, "User not found");

    const isUser = await checkUser(password, existingUser.password);
    if (!isUser) throw new ApiError(401, "Invalid credentials");

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
