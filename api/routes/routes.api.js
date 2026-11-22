import { Router } from 'express';
import * as characterHpController from '../controller/characters.controller.api.js';
import { validateCharacter, validateCharacterPartial } from '../../middlewares/characters.valide.js';
const router = Router();

router.get('/api/personajes', characterHpController.getCharacters);
router.get('/api/personajes/:id', characterHpController.getCharacterById);
router.post('/api/personajes', [validateCharacter], characterHpController.saveCharacter);
router.delete('/api/personajes/:id', characterHpController.deleteCharacter);
router.put('/api/personajes/:id', validateCharacter, characterHpController.updateCharacter) // schema completo
router.patch('/api/personajes/:id', validateCharacterPartial, characterHpController.updateCharacter) // charactersSchema.partial()
//comentarios
router.post('/api/personajes/:id/comentarios', characterHpController.saveCharacterComment);

export default router;