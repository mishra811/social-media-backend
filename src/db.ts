import { MongoClient } from 'mongodb'

export const client = new MongoClient(
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/',
)

export const db = client.db()

client.connect()
