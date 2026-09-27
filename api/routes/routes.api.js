import { Router } from 'express';
import * as characterHpController from '../controller/controller.api.js';
const router = Router();

router.get('/api/personajes', characterHpController.getCharacters);
router.get('/api/personajes/:id', characterHpController.getCharacterById);
router.post('/api/personajes', characterHpController.saveCharacter);
router.delete('/api/personajes/:id', characterHpController.deleteCharacter);
router.put('/api/personajes/:id', characterHpController.saveCharacter);
router.patch('/api/personajes/:id', characterHpController.updateCharacter);

export default router;