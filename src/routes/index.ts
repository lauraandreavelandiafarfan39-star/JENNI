import { Router } from 'express';
import loanRoutes from './loan.routes';
import userRoutes from './user.routes';
import environmentsRoutes from './ambientes.routes';
import equipmentRoutes from './equipamientos.routes';

const router = Router();

router.use('/loans', loanRoutes);
router.use('/users', userRoutes);
router.use('/environments', environmentsRoutes);
router.use('/equipment', equipmentRoutes);

export default router;