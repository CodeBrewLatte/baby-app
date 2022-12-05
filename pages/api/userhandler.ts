import dbConnect from '../../db/dbConnect'
import User from '../../models/User'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
console.log('we made it to the handler')
  const newUser = mongoose.model('User');
  const { method } = req

  await dbConnect()
    console.log('db connect', dbConnect())
  switch (method) {
    case 'GET':
      try {
        const users = await User.find({})
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        console.log('We hit the POST Request')
        //const user = await User.find({})
        //console.log('the user is', user)
        console.log(req.body)
        const newUser = await User.create(req.body)
        res.status(201).json({ success: true, data: newUser })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}