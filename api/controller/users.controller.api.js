import * as usersServices from '../../services/usersServices.js';
import * as charactersHpServices from '../../services/charactersHpServices.js';
import * as commentsServices from '../../services/commentsServices.js';


export async function getUsers(req, res) {
    try {
        const users = await usersServices.getUsers(req.query);
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

export async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const deleted = await usersServices.deleteUser(id)
        if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.status(200).json({ message: 'Usuario eliminado' })
    } catch (error) {
        res.status(500).json({ error: 'No se pudo eliminar el usuario' })
    }
}

export async function login(req, res) {
    try {
        const user = await usersServices.login(req.body)
        if (!user) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'No se pudo iniciar sesión' })
    }
}

export async function changeRol(req, res) {
    try {
        const { id } = req.params
        if (id === req.user._id) return res.status(400).json({ error: 'No podés cambiar tu propio rol' })

        const updated = await usersServices.changeRol(id, req.body.rol)
        if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.status(200).json({ message: 'Rol actualizado', rol: req.body.rol })
    } catch (error) {
        res.status(500).json({ error: 'No se pudo cambiar el rol' })
    }
}

