// src/routes/ambientes.routes.ts
import { Router } from 'express';
import { EnvironmentController } from '../controllers/ambientes.controller';
import { validateCreateAmbiente } from '../middlewares/validateAmbiente.middleware';

const router = Router();

router.get('/', EnvironmentController.getEnvironments);
router.post('/', validateCreateAmbiente, EnvironmentController.createEnvironment);
router.patch('/:id', EnvironmentController.updateEnvironment);

export default router;