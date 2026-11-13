// import { ObjectId } from 'mongodb';
import db from '../config/db.js';

export async function getUsers() {
    return await db.collection('users').find().toArray();
}


export async function createUser(user) {
    const newUser = await db.collection('users').insertOne(user);
    return { _id: newUser.insertedId, ...user };
}