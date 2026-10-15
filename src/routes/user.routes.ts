import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

//definicion de las rutas del modulo

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;