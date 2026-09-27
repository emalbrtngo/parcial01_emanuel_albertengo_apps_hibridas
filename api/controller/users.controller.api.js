import * as usersServices from '../../services/usersServices.js';
import * as charactersHpServices from '../../services/charactersHpServices.js';


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

