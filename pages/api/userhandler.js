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
  console.log("we made it to the handler");
  //const newUser = mongoose.model("User");
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      let user;
      try {
        console.log("We hit the POST Request");
        //const user = await User.find({})
        //console.log('the user is', user)
        console.log(req.body);
        console.log(req.headers.cookies);

        //check if username exists already (need to code this!)

        //if it does not start creating hash
        const salt = bcrypt.genSaltSync();
        const { email, username, password, baby } = req.body;

        try {
          user = await User.create({
            email: email,
            username: username,
            password: bcrypt.hashSync(password, salt),
            baby: baby,
            sesh: null,
          });
        } catch (e) {
          console.log("error hit in user creation!", e);
          //need to create other types of errors!
          res
            .status(401)
            .json({ error: "User already exists, please log in!" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      } finally {
        const cookies = new Cookies(req, res);
        console.log("the user is", user);
        const token = jwt.sign(user.toJSON(), process.env.SECRET, {
          expiresIn: "1h",
        });
        cookies.set("token", token, {
          httpOnly: true,
        });
        return res.status(200).json({ success: true });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
