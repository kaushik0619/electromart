import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

let db: Db;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  const client = new MongoClient(mongoUri);
  await client.connect();
  console.log('Connected to MongoDB');

  db = client.db(); // You can specify a database name here, e.g., client.db("techmart")
  return db;
}
