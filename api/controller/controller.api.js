// mongodb+srv://admin:admin@dwm4av.wrlj6eo.mongodb.net/
import * as characterHpService from '../../services/charactersHpServices.js'

export async function getCharacters(req, res) {
    try {
        const characters = await characterHpService.getCharacters(req.query);
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getCharacterById(req, res){
    try {
        const { id } = req.params;
        const character = await characterHpService.getCharacterById(id); 
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function saveCharacter(req, res) {
    try {
        const newCharacter = await characterHpService.saveCharacter(req.body);
        if (newCharacter) {
            res.status(201).json(newCharacter);
        } else {
            res.status(400).json({ error: 'Ese personaje ya existe y no se puede guardar.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteCharacter(req, res) {
    try {
        const { id } = req.params;
        const deletedCharacter = await characterHpService.deleteCharacterById(id);
        if (deletedCharacter) {
            res.status(200).json(deletedCharacter);
        } else {
            res.status(404).json({ error: 'Personaje no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateCharacter(req, res) {
    try {
        const { id } = req.params;
        const character = await characterHpService.getCharacterById(id);
        req.body = {
        "name": req.body.name ?? character?.name,
        "species": req.body.species ?? character?.species,
        "gender": req.body.gender ?? character?.gender,
        "house": req.body.house ?? character?.house,
        "dateOfBirth": req.body.dateOfBirth ?? character?.dateOfBirth,
        "yearOfBirth": req.body.yearOfBirth ?? character?.yearOfBirth,
        "ancestry": req.body.ancestry ?? character?.ancestry,
        "eyeColour": req.body.eyeColour ?? character?.eyeColour,
        "hairColour": req.body.hairColour ?? character?.hairColour,
        "wand": {
            "wood": req.body.wand?.wood ?? character?.wand?.wood,
            "core": req.body.wand?.core ?? character?.wand?.core,
            "length": req.body.wand?.length ?? character?.wand?.length,
        },
        "patronus": req.body.patronus ?? character?.patronus,
        "hogwartsStudent": req.body.hogwartsStudent ?? character?.hogwartsStudent,
        "hogwartsStaff": req.body.hogwartsStaff ?? character?.hogwartsStaff,
        "actor": req.body.actor ?? character?.actor,
        "alive": req.body.alive ?? character?.alive,
        "image": req.body.image ?? character?.image
        };
        const updatedCharacter = await characterHpService.saveCharacter(req.body);
        if (updatedCharacter) {
            res.status(200).json(updatedCharacter);
        } else {
            res.status(404).json({ error: 'Personaje no encontrado.' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}