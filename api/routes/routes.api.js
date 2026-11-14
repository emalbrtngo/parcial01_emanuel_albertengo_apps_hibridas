import { Router } from 'express';
import * as characterHpController from '../controller/characters.controller.api.js';
const router = Router();

router.get('/api/personajes', characterHpController.getCharacters);
router.get('/api/personajes/:id', characterHpController.getCharacterById);
router.post('/api/personajes', characterHpController.saveCharacter);
router.delete('/api/personajes/:id', characterHpController.deleteCharacter);
router.put('/api/personajes/:id', characterHpController.saveCharacter);
router.patch('/api/personajes/:id', characterHpController.updateCharacter);
//comentarios
router.post('/api/personajes/:id/comentarios', characterHpController.saveCharacterComment);

export default router;