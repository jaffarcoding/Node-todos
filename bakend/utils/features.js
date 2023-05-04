import jwt from "jsonwebtoken";
export const sendCookies = (User, res, message, statuscode) => {
  const token = jwt.sign({ _id: User._id }, "hgefdhehadfiuewhfuiw");
  res
    .status(statuscode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 100,
      sameSite: process.env.NODE_ENV === "Development" ? "lax": "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
