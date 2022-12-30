import { getCookie } from "cookies-next";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const User = mongoose.models.User;
  const jwt = require("jsonwebtoken");
  const token = req.cookies.token;

  console.log(token);
  const decoded = jwt.decode(token);
  const userId = decoded.sub;

  const user = await User.findById(userId);
  console.log(user);
  res.status(200).json({ name: user });
}
