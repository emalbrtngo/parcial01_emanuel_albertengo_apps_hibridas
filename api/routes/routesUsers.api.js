import { Router } from 'express';
import * as usersController from '../controller/users.controller.api.js';
import { validateUserRegister } from '../../middlewares/users.valide.js';
const router = Router();


router.get('/api/users', usersController.getUsers); 
router.post('/api/users', [validateUserRegister], usersController.createUser); //register/create
router.get('/api/users/:id/personajes', usersController.getUserCharacters);
router.get('/api/users/:id/comentarios', usersController.getUserComments);
router.delete('/api/users/comentarios/:commentId', usersController.deleteUserComment);



export default router;