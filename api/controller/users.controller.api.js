import * as usersServices from '../../services/usersServices.js';
import * as charactersHpServices from '../../services/charactersHpServices.js';
import * as commentsServices from '../../services/commentsServices.js';


export async function getUsers(req, res) {
    try {
        const users = await usersServices.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron obtener los usuarios' });
    }
}

export async function createUser(req, res) {
    try {
        const newUser = await usersServices.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear el usuario' });
    }
}

export async function getUserCharacters(req, res) {
    try {
        const personajes = await charactersHpServices.getPersonajesPorUsuario(req.params.id);
        res.json(personajes);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron obtener los personajes del usuario' });
    }
}

export async function getUserComments(req, res) {
    try {
        const id = req.params.id;
        const user = await usersServices.getUserById(id);
        if(!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user?.comments || []);
    } catch (error) {
        res.status(500).json({ error: 'No se pudieron obtener los comentarios del usuario' });
    }
}

export async function deleteUserComment(req, res) {
    try {
        const commentId = req.params.commentId;
        if (!commentId) {
            return res.status(400).json({ error: 'Falta el ID del comentario' });
        }
        await commentsServices.deleteCommentById(commentId);
        res.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el comentario del usuario' });
    }
}

