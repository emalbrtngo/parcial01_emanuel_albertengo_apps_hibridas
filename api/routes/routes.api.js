import { Router } from 'express';
import * as characterHpController from '../controller/characters.controller.api.js';
import { validateCharacter, validateCharacterPartial } from '../../middlewares/characters.valide.js';
import { validateComment } from '../../middlewares/comments.valide.js';
import { validateToken , validateRol} from '../../middlewares/auth.validate.js'
const router = Router();

router.get('/api/personajes', characterHpController.getCharacters);
router.get('/api/personajes/:id', characterHpController.getCharacterById);
router.post('/api/personajes', [validateToken, validateCharacter ], characterHpController.saveCharacter);
router.delete('/api/personajes/:id', [validateToken], characterHpController.deleteCharacter);
router.put('/api/personajes/:id', [validateToken, validateCharacter ], characterHpController.updateCharacter) // schema completo
router.patch('/api/personajes/:id', [validateCharacterPartial, validateToken], characterHpController.updateCharacter) // charactersSchema.partial()

//comentarios en personajes
router.post('/api/personajes/:id/comentarios', [validateToken, validateComment ] , characterHpController.saveCharacterComment);
router.delete('/api/personajes/comentarios/:commentId', validateToken ,characterHpController.deleteCharacterComment)
// router.get('/api/personajes/:id/comentarios', characterHpController.getCommentsByCharacterId);

export default router;