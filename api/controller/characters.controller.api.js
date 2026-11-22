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
        const newCharacter = await characterHpService.createCharacter(req.body);
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
        const character = await characterHpService.updateCharacter(req.params.id, req.body)
        if (!character) return res.status(404).json({ error: 'Personaje no encontrado' })
        res.status(200).json(character)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function saveCharacterComment(req, res) {
    try{
        const id = req.params.id;
        const character = await characterHpService.saveCharacterCommentById(id, req.body);
        if(character) {
            res.status(200).json(character);
        } else {
            res.status(404).json({ error: 'Personaje no encontrado.' });
        }
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}