import { user } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let User = await user.findOne({ email });

  if (User) return next(new ErrorHandler("User Already Exist", 400));

  const hascode = await bcrypt.hash(password, 10);
  User = await user.create({ name, email, password: hascode });
  sendCookies(User, res, "registered successfully", 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  const User = await user.findOne({ email }).select("+password");
  if (!User) return next(new ErrorHandler("Invalid Email or Password", 400));

  const ismatch = await bcrypt.compare(password, User.password);
  if (!ismatch) {
    return res.status(404).json({
      success: false,
      message: "invalid email or password",
    });
  }
  sendCookies(User, res, `welcome back ${User.name}`, 200);
};
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.User,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax": "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.User,
    });
};
