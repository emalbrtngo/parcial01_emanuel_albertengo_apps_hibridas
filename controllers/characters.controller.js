import { createCard } from '../page/until.js';
import * as charactersHpViews from '../views/charactersHpViews.js';
import * as charactersHpServices from '../services/charactersHpServices.js';

export async function getCharacters(req, res){
    try {
        const filtros = req.query;
        const data = await charactersHpServices.getCharacters(filtros);
        const totalPages = Math.ceil(await charactersHpServices.getCharactersLength(filtros) / 9);
        const cards = data.map(personaje => createCard(personaje)).join('');


        res.send(charactersHpViews.createCharacterPage('Personajes de Harry Potter', cards, totalPages));
    } catch (error) {
        console.error(error);
        res.send(charactersHpViews.createErrorPage('Error', 'Ocurrió un error al obtener los personajes.'));
    }
}

export async function getCharacterById(req, res){
    try {
        const { id } = req.params;
        const character = await charactersHpServices.getCharacterById(id);  
        res.send(charactersHpViews.createCharacterDetailPage(`Personaje: ${id}`, character));
    } catch (error) {
        console.error(error);
        res.send(charactersHpViews.createErrorPage('Error', 'Ocurrió un error al obtener el personaje.'));
    }
}

export async function getNewCharacterForm(req, res){
    try {
        res.send(charactersHpViews.createNewCharacterFormPage('Nuevo Personaje'));
    } catch (error) {
        console.error(error);
        res.send(charactersHpViews.createErrorPage('Error', 'Ocurrió un error al mostrar el formulario de nuevo personaje.'));
    }
}

export async function createNewCharacter(req, res){
    try {
        const nuevoPersonaje = await charactersHpServices.saveCharacter(req.body);
        res.send(charactersHpViews.createCharacterDetailPage(`Personaje: ${nuevoPersonaje.name}`, nuevoPersonaje));
    } catch (error) {
        console.error(error);
        res.send(charactersHpViews.createErrorPage('Error', 'Ocurrió un error al crear el nuevo personaje.'));
    }
}

export async function editCharacterForm(req, res){
    try {
        // Lógica para mostrar el formulario de edición de un personaje
        const personaje = await charactersHpServices.getCharacterById(req.params.id);
        // console.log(personaje);        
        res.send(charactersHpViews.createEditCharacterFormPage(`Editar Personaje - ${personaje.name}`, personaje));
    } catch (error) {
        console.error(error);
        res.send(charactersHpViews.createErrorPage('Error', error.message));
    }
}

// export async function editCharacter(req, res){
//     try {
//         const personajeEditado = await charactersHpServices.saveCharacter(req.body);
//         res.send(charactersHpViews.createCharacterDetailPage(`Personaje: ${personajeEditado.name}`, personajeEditado));
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

export async function deleteCharacterConfirmForm(req, res){
    try {
        // Lógica para eliminar un personaje
        const personaje = await charactersHpServices.getCharacterById(req.params.id);
        res.send(charactersHpViews.createConfirmDeleteCharacterPage(`Eliminar Personaje - ${personaje.name}`, personaje));
    } catch (error) {
        console.error(error);
        res.send(charactersHpViews.createErrorPage('Error', 'Ocurrió un error al intentar borrar el personaje.'));
    }
}

export async function deleteCharacter(req, res){
    try {
        const { id } = req.params;
        await charactersHpServices.deleteCharacterById(id);
        console.log(`Personaje eliminado: ${id}`);
        res.redirect('/personajes');
    } catch (error) {
        console.error(error);
        res.send(charactersHpViews.createErrorPage('Error', 'Ocurrió un error al eliminar el personaje de forma permanente'));
    }
}

// export default { getCharacters, getCharacterByName, getNewCharacterForm };