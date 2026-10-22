// src/routes/equipamientos.routes.ts
import { Router } from 'express';
import { EquipmentController } from '../controllers/equipamientos.controller';
import { validateCreateEquipment } from '../middlewares/validateEquipamiento.middleware';

const router = Router();

router.get('/', EquipmentController.getEquipment);
router.post('/', validateCreateEquipment, EquipmentController.createEquipment);
router.patch('/:id', EquipmentController.updateEquipment);

export default router;