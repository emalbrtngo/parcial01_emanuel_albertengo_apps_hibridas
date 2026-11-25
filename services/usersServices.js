import { ObjectId, Timestamp } from 'mongodb';
import db from '../config/db.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_PW

export async function getUsers(filtros={}) {
    const filter = { eliminado: { $ne: true } };
    try {
        const usuarios = await db.collection('users').find(filter).toArray();
        return usuarios
        
    } catch (error) {
            console.error(error);
            throw new Error('Página no encontrada');
        }
    
}

export async function userExists(id) {
    const count = await db.collection('users').countDocuments({ _id: new ObjectId(id) })
    return count > 0
}


export async function getUserById(id) {
    return await db.collection('users').findOne({ _id: new ObjectId(id) });
}

export async function setUserRol(id, rol) {
    return await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: { rol } }
    );
}

export async function deleteUser(id) {
    const res = await db.collection('users').updateOne(
        { _id: new ObjectId(id), eliminado: { $ne: true } },
        { $set: { eliminado: true } }
    )
    return res.matchedCount > 0 
}


// auth
// registro
export async function createUser(user) {
    const existe = await db.collection('users').findOne({email: user.email})
        if (existe) return false
    delete user.passwordConfirm
    const usuarioPreparado = { ...user, // con pw hasheado, rol y fecha de creación
        password: await bcrypt.hash(user.password, 10), 
        rol: "user", 
        createdAt: new Date() 
    }
    const newUser = await db.collection('users').insertOne(usuarioPreparado);
    return { _id: newUser.insertedId, ...usuarioPreparado };
}
//login
export async function login(user){
    const usuario = await db.collection('users').findOne({email: user.email})
    if(!usuario) return false
    if(usuario.eliminado) return false
    const valido = await bcrypt.compare(user.password, usuario.password) // compaara las pw encriptadas
    if(!valido) return false

    const payload = { // esta info contiene el token
        _id: usuario._id,
        email: usuario.email,
        username: usuario.username,
        rol: usuario.rol
    }

    //firmamos el token
    const token = jwt.sign(payload, JWT_SECRET,{ expiresIn: '2h'})

    return {
        _id: usuario._id.toString(),
        email: usuario.email,
        username: usuario.username,
        rol: usuario.rol,
        token: token
    }
}

export async function changeRol(id, rol) {
    const res = await db.collection('users').updateOne(
        { _id: new ObjectId(id), eliminado: { $ne: true } },
        { $set: { rol } }
    )
    return res.matchedCount > 0
}