export default function handler(req, res) {
  console.log("here is the data being passed ", req.body);
  res.status(200).json({ name: "John Doe" });
}
