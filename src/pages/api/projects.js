import { connectToDatabase } from "../../app/lib/mongodb"

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection("projects")

    const data = await collection.find({}).toArray()

    res.status(200).json({ success: true, data })
  } catch (error) {
    console.error("MongoDB Connection Error:", error)
    res.status(500).json({ success: false, error: "Database connection failed" })
  }
}
