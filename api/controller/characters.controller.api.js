import * as characterHpService from '../../services/charactersHpServices.js'
import * as commentsService from '../../services/commentsServices.js'

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
        const characterToSave = { ...req.body, author: req.user._id, authorUsername: req.user.username } // agrego el id y nombre del token
        const newCharacter = await characterHpService.createCharacter(characterToSave)
        res.status(201).json(newCharacter)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function deleteCharacter(req, res) {
    try {
        const { id } = req.params;

        const character = await characterHpService.getCharacterById(id)
        const esAuthor = character.author?.toString() === req.user._id
        const esAdmin = req.user.rol === "admin"
        if (!esAuthor && !esAdmin) return res.status(403).json({ error: "No podés eliminar este personaje" })


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
        const { id } = req.params

        const character = await characterHpService.getCharacterById(id)
        if (!character) return res.status(404).json({ error: 'Personaje no encontrado' })

        const esAuthor = character.author?.toString() === req.user._id
        const esAdmin = req.user.rol === "admin"
        if (!esAuthor && !esAdmin) return res.status(403).json({ error: "No podés editar este personaje" })

        const updated = await characterHpService.updateCharacter(id, req.body)
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


//#############COMENTARIOS
export async function saveCharacterComment(req, res) {
    try {
        // armo acá el comentario con los datos del token
        const comment = {
            _id: req.user._id,
            username: req.user.username,
            content: req.body.content,
        }
        const character = await characterHpService.saveCharacterCommentById(req.params.id, comment)
        res.status(201).json(character)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function deleteCharacterComment(req, res) {
    try {
        const { commentId } = req.params

        const comment = await commentsService.getCommentById(commentId)
        if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' })

        const esAuthor = comment._id?.toString() === req.user._id
        const esAdmin = req.user.rol === "admin"
        // console.log({ autor: comment._id, logueado: req.user._id, rol: req.user.rol })
        if (!esAuthor && !esAdmin) return res.status(403).json({ error: "No podés eliminar este comentario" })

        await commentsService.deleteCommentById(commentId)
        res.status(200).json({ message: 'Comentario eliminado' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
