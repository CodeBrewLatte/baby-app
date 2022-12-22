import dbConnect from "../../db/dbConnect";
import User from "../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  console.log("we made it to the handler");
  //const newUser = mongoose.model("User");
  const { method } = req;

  await dbConnect();
  console.log("db connect", dbConnect());
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

        //check if username exists already

        //if it does not start creating hash
        const salt = bcrypt.genSaltSync();
        const { email, username, password, baby } = req.body;

        try {
          user = await User.create({
            email: email,
            username: username,
            password: bcrypt.hashSync(password, salt),
            baby: baby,
          });
        } catch (e) {
          res
            .status(401)
            .json({ error: "User already exists, please log in!" });
        }

        //after hash make a token

        //send back the token in setHeader
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      user = Object.assign({}, user);
      const token = jwt.sign(user, "secret", {
        expiresIn: "8h",
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("BabyAuth", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: true,
        })
      );
      res.json(user);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
