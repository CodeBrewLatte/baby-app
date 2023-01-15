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
  console.log("we made it to the login handler");
  //const newUser = mongoose.model("User");
  const { method } = req;

  console.log("db connect", dbConnect());
  switch (method) {
    case "POST":
      let user;
      try {
        console.log("We hit the POST Request");
        //const user = await User.find({})
        //console.log('the user is', user)
        console.log(req.body);
        console.log(req.cookies);
        console.log("User is", User);

        try {
          //first check to see if the user even exists on the database
          const userExists = await User.findOne({ email: req.body.email });
          if (userExists) {
            //if they do grab their password
            let hash = userExists.password;
            //compare the password against what's being put in -- this will return truthy if passes
            const passwordCheck = await bcrypt.compare(req.body.password, hash);
            console.log("password check -->", passwordCheck);

            if (passwordCheck) {
              const cookies = new Cookies(req, res);
              console.log("the user is", userExists._id);
              const token = jwt.sign(
                { sub: userExists._id },
                process.env.SECRET,
                {
                  expiresIn: "1h",
                }
              );
              cookies.set("token", token, {
                httpOnly: true,
              });
              return res.status(200).json({ success: true });
            } else return res.status(400).json({ success: false });

            console.log(passwordCheck);
          } else {
            console.log("user exists?", userExists);
            return res.status(400).json({ success: false });
          }
        } catch (error) {
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      }
      break;
  }
}
