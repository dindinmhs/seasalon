import { MongoClient } from "mongodb";

export default async function connectDB() {
    try {
        const db = await new MongoClient(process.env.MONGO_URI).db('sea_salon')
        return db
    } catch (error) {
        console.error('failed connect to db', error)
    }
}