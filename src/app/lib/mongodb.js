import { MongoClient } from "mongodb"

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_HOST = process.env.MONGO_HOST
const MONGO_DB = process.env.MONGO_DB

if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_HOST || !MONGO_DB) {
  throw new Error("Please define all MongoDB environment variables inside .env.local")
}

// Construct MongoDB URI dynamically
const MONGODB_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = client.db(MONGO_DB)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
