import { ObjectId } from 'mongodb';
import db from '../config/db.js';

export async function getUsers() {
    return await db.collection('users').find().toArray();
}

export async function createUser(user) {
    const userWithRol = { ...user, rol: "user" }
    const newUser = await db.collection('users').insertOne(userWithRol);
    return { _id: newUser.insertedId, ...userWithRol };
}

export async function userExists(id) {
    const count = await db.collection('users').countDocuments({ _id: new ObjectId(id) })
    return count > 0
}


export async function getUserById(id) {
    return await db.collection('users').findOne({ _id: new ObjectId(id) });
}

export async function setUserRol(id, rol) {
    await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: { rol } }
    );
}