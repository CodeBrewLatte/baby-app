import dbConnect from "../../db/dbConnect";
import User from "../../models/User";
import mongoose from "mongoose";

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
      try {
        console.log("We hit the POST Request");
        //const user = await User.find({})
        //console.log('the user is', user)
        console.log(req.body);
        console.log(req.headers.cookies);
        //const cookie = await cookieCreator();
        //console.log("cookie is", cookie);
        //const newUser = await User.create(req.body);
        //res.status(201).json({ success: true, data: newUser });
        res.status(201).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
