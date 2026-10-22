import { Router } from 'express';
import { EquipmentController } from '../controllers/equipamientos.controller';
import {
  validateCreateEquipment,
  validateUpdateEquipment,
} from '../middlewares/validateEquipamiento.middleware';

const router = Router();

router.get('/', EquipmentController.getEquipment);
router.post('/', validateCreateEquipment, EquipmentController.createEquipment);
router.patch('/:id', validateUpdateEquipment, EquipmentController.updateEquipment);

export default router;