import { Router } from 'express';
import * as usersController from '../controller/users.controller.api.js';
const router = Router();


router.get('/api/users', usersController.getUsers); 
router.post('/api/users', usersController.createUser);
router.get('/api/users/:id/personajes', usersController.getUserCharacters);



export default router;