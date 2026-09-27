const MONGO_URI = process.env.MONGO_URI;
import { MongoClient, ObjectId } from 'mongodb';
const client = new MongoClient(MONGO_URI);
const db = client.db('AH20232CP1');

export async function getUsers() {
    return await db.collection('users').find().toArray();
}


export async function createUser(user) {
    const newUser = await db.collection('users').insertOne(user);
    return { _id: newUser.insertedId, ...user };
}