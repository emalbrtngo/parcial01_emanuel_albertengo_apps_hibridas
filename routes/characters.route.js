import * as charactersHpController from '../controllers/charactersHpController.js';
import { Router } from 'express';

const router = Router();

router.get('/personajes', charactersHpController.getCharacters); //muestra todos
router.get('/personajes/nuevo', charactersHpController.getNewCharacterForm); // muestra form
router.post ('/personajes/nuevo', charactersHpController.createNewCharacter); // action del form - crea nuevo personaje (guarda)
router.get('/personajes/:id/editar', charactersHpController.editCharacterForm); // muestra form editar
// router.post('/personajes/:id/editar', charactersHpController.editCharacter);
router.post('/personajes/:id/editar', charactersHpController.createNewCharacter); // mismo que para crear  -guarda cambios si ya existe
router.get('/personajes/:id/eliminar', charactersHpController.deleteCharacterConfirmForm); // muestra confirmación de eliminación
router.post('/personajes/:id/eliminar', charactersHpController.deleteCharacter); // action de confirmación de eliminación
router.get('/personajes/:id', charactersHpController.getCharacterById); // muestra detalle del personaje

export default router;