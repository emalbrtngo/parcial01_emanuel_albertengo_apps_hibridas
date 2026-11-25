import { Router } from 'express';
import * as usersController from '../controller/users.controller.api.js';
import { validateUserLogin, validateUserRegister, validateUserRol } from '../../middlewares/users.valide.js';
const router = Router();
import { validateToken , validateRol} from '../../middlewares/auth.validate.js'



router.get('/api/users', [validateToken, validateRol(['admin'])],usersController.getUsers); 
router.post('/api/users', [validateUserRegister], usersController.createUser); //register/create
router.delete('/api/users/:id',[validateToken, validateRol(['admin'])],usersController.deleteUser);
router.get('/api/users/:id/personajes', validateToken ,usersController.getUserCharacters);
router.post('/api/users/login',[validateUserLogin] ,usersController.login)
router.patch('/api/users/:id/rol', [validateToken, validateRol(["admin"]), validateUserRol], usersController.changeRol)



export default router;