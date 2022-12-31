import dbConnect from "../../db/dbConnect";
//import User from "../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";
import { setCookie } from "cookies-next";
import Cookies from "cookies";
import { getUserModel } from "/models/User";

export default async function handler(req, res) {
  await dbConnect();
  const User = getUserModel();
  console.log("we made it to the create post handler");
  //const newUser = mongoose.model("User");
  const { method } = req;
  const payload = req.body.click;

  console.log("db connect", dbConnect());
  switch (method) {
    case "POST":
      let user;
      try {
        console.log("We hit the Create Log POST Request");
        console.log("we got", payload);
        //const user = await User.find({})
        //console.log('the user is', user)
        console.log(req.body);
        console.log(req.cookies);
        //console.log("User is", User);

        try {
          const jwt = require("jsonwebtoken");
          const token = req.cookies.token;
          const decoded = jwt.decode(token);
          const userId = decoded.sub;
          //update user
          const entry = { date: new Date(), value: payload };
          await User.updateOne({ _id: userId }, { $push: { entries: entry } });
          return res.status(200).json({ success: true });
        } catch (error) {
          console.log(error);
        }

        break;
      } catch (e) {
        console.log(e);
      }
  }
}
