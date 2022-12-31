import { getCookie } from "cookies-next";
import mongoose from "mongoose";
import { getUserModel } from "/models/User";
import dbConnect from "../../db/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const User = await getUserModel();
  console.log("User was generated as", User);
  const jwt = require("jsonwebtoken");
  const token = req.cookies.token;

  console.log(token);
  try {
    const decoded = jwt.decode(token);
    const userId = decoded.sub;
    const user = await User.findById(userId);
    console.log(user);
    res.status(200).json({ name: user });
  } catch (error) {
    res.status(200).json({ error: "undefined" });
  }
}
