import { ObjectId } from 'mongodb';
import db from '../config/db.js';
import { characterExists, getCharacterById } from './charactersHpServices.js';
import { userExists } from './usersServices.js';
import client from '../config/client.js';


export async function saveCharacterComment(characterId, usuario) {
    try {

        if (!(await characterExists(characterId))) throw new Error('Personaje no encontrado')
        if (!(await userExists(usuario._id))) throw new Error('Usuario no encontrado')

        usuario._idComment = new ObjectId(); // agrego un id al comentario
        await db.collection('hp_characters').updateOne( // agrego el comentario al personaje
            { _id: new ObjectId(characterId) },
            { $push: { comments: { ...usuario } } }
        );

        const character = await getCharacterById(characterId)
        // armo el objeto character que se agregara al usuario
        // mando 
        usuario.character = { _id: character._id, characterName: character.name };
        const userId = await db.collection('users').findOne({ _id: new ObjectId(usuario._id) });
        if (!userId) {
            throw new Error('Usuario no encontrado');
        }
        await db.collection('users').updateOne(
            { _id: new ObjectId(userId._id) },
            { $push: { comments: { ...usuario } } }
        );

        return character;
    } catch (error) {
        throw new Error('Error al guardar el comentario del personaje');
    }
}

export async function deleteCommentById(commentId) {
    const session = client.startSession()
    const id = new ObjectId(commentId)

    try {
        session.startTransaction()

        const resCharacter = await db.collection('hp_characters').updateOne(
            { 'comments._idComment': id },
            { $pull: { comments: { _idComment: id } } },
            { session }
        )
        const resUser = await db.collection('users').updateOne(
            { 'comments._idComment': id },
            { $pull: { comments: { _idComment: id } } },
            { session }
        )

        if (resCharacter.modifiedCount == 0 || resUser.modifiedCount == 0) {
            throw new Error('Comentario no encontrado')
        }

        await session.commitTransaction()
        return true
    } catch (error) {
        await session.abortTransaction()
        throw error
    } finally {
        await session.endSession()
    }
}