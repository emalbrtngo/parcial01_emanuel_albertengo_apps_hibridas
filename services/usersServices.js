import { ObjectId } from 'mongodb';
import db from '../config/db.js';

export async function getUsers() {
    return await db.collection('users').find().toArray();
}

export async function createUser(user) {
    const newUser = await db.collection('users').insertOne(user);
    return { _id: newUser.insertedId, ...user };
}

export async function userExists(id) {
    const count = await db.collection('users').countDocuments({ _id: new ObjectId(id) })
    return count > 0
}


export async function getUserById(id) {
    return await db.collection('users').findOne({ _id: new ObjectId(id) });
}