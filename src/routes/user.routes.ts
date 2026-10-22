
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateCreateUser } from '../middlewares/validateUser.middleware';

const router = Router();

router.get('/', UserController.getUsers);
router.post('/', validateCreateUser, UserController.createUser);
router.get('/:id', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;