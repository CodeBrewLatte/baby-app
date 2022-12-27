import dbConnect from "../../db/dbConnect";
import User from "../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";
import { setCookie } from "cookies-next";
import Cookies from "cookies";

export default async function handler(req, res) {
  console.log("we made it to the login handler");
  //const newUser = mongoose.model("User");
  const { method } = req;

  await dbConnect();
  console.log("db connect", dbConnect());
  switch (method) {
    case "POST":
      let user;
      try {
        console.log("We hit the POST Request");
        //const user = await User.find({})
        //console.log('the user is', user)
        console.log(req.body);
        console.log(req.headers.cookies);

        try {
          const userExists = await User.findOne({ email: req.body.email });
          if (userExists) {
            let hash = userExists.password;
            const passwordCheck = await bcrypt.compare(req.body.password, hash);

            console.log(passwordCheck);
          }
          console.log(userExists);
        } catch (error) {
          console.log(error);
        } finally {
          //if it does not start creating hash
          const cookies = new Cookies(req, res);
          console.log("the user is", user);
          //   const token = jwt.sign(user.toJSON(), process.env.SECRET, {
          //     expiresIn: "1h",
          //   });
          //   cookies.set("token", token, {
          //     httpOnly: true,
          //   });
          return res.status(200).json({ success: true });
        }

        break;
      } catch (e) {
        console.log(e);
      }
  }
}
