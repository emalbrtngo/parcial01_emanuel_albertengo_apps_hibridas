// import { readFile } from 'fs/promises';

const MONGO_URI = process.env.MONGO_URI;
import { MongoClient, ObjectId } from 'mongodb';
const client = new MongoClient(MONGO_URI);
const db = client.db('AH20232CP1');


export async function getCharacters(filtros = {}) {

    const filter = { eliminado: { $ne: true } }; // $ne = not equal -> incluye tambien si la propeidad no existe
    const page = parseInt(filtros.page) || 1;
    const limit = parseInt(filtros.limit) || 9;
    const skip = (page - 1) * limit;

    if(filtros?.house) {filter.house = filtros?.house};
    if(filtros?.gender) {filter.gender = filtros?.gender};
    if( filtros?.title ) filter.$text = { $search: filtros?.title };
    
    try {

        const personajes = await db.collection('hp_characters')
        .find(filter)
        .skip(skip)
        .limit(limit)
        .toArray();


        return personajes;
    } catch (error) {
            console.error(error);
            throw new Error('Página no encontrada');
        }
}

export async function getCharactersLength(filtros = {}) {
    const filter = { eliminado: { $ne: true } };
    if(filtros?.house) {filter.house = filtros?.house};
    if(filtros?.gender) {filter.gender = filtros?.gender};
    if( filtros?.title ) filter.$text = { $search: filtros?.title };
    try {
        return await db.collection('hp_characters').countDocuments(filter);
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener la cantidad de personajes');
    }
}

export async function getCharacterById(id) {
    try {
        const character = await db.collection('hp_characters').findOne({ _id: new ObjectId(id), eliminado: { $ne: true } });
        // const character = personajes.find(personaje => personaje._id.toString() === id.toString());
        if (!character) {
            throw new Error('Personaje no encontrado');
        }
        return character;
    } catch (error) {
        console.error(error);
        throw new Error('Página no encontrada');
    }
}

export async function saveCharacter(character){
    try {

        console.log('Guardando personaje:', character);
        character.customCharacter = true;
        const existingCharacter = await db.collection('hp_characters').findOne({ name: character.name });
        if (existingCharacter) {
            console.log('Actualizando personaje existente:', character);
            await db.collection('hp_characters').updateOne(
                { _id: existingCharacter._id }, //primero filtro, luego el operador $set
                { $set: character }
            );
            return character;
        } else {
            // personajes.push(character);
            await db.collection('hp_characters').insertOne(character);
            console.log('Creando nuevo personaje:', character);
            
            return character;
        }

        //Logica para guardar el personaje en la bbds cuando exista en mongodb
    } catch (error) {
        throw new Error('Error al guardar el personaje');
        
    }
} 

export async function deleteCharacterById(id){
    try {
        console.log('Eliminando personaje (servicio), agrega flag para eliminación lógica:', id);
        const personaje = await getCharacterById(id);
        if(!personaje){
            throw new Error('Personaje no encontrado');
        }
        await db.collection('hp_characters').updateOne(
            { _id: personaje._id },
            { $set: { eliminado: true } }
        );
        return personaje;
        //Logica para eliminar el personaje en la bbds cuando exista en mongodb
    } catch (error) {
        throw new Error('Error al eliminar el personaje');
    }
} 

export async function deleteCharacterPermanentById(id){
    try {
        const personaje = await getCharacterById(id);
        if(!personaje){
            throw new Error('Personaje no encontrado');
        }
        await db.collection('hp_characters').deleteOne( { _id: personaje._id } );
        console.log('PERSONAJE ELIMINADO PERMANENTEMENTE (FISICO):', personaje);
        return personaje;
    } catch (error) {
        throw new Error('Error al eliminar permanentemente el personaje');
    }
}


export async function getPersonajesPorUsuario(userId) {
    try {
        return await db.collection('hp_characters').find({ userId: userId }).toArray();
    } catch (error) {
        throw new Error('Error al obtener los personajes del usuario');
    }
}
