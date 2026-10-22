import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { requestLogger } from './middlewares/logger.middleware';
import { globalErrorHandler } from './middlewares/errorHandler.middleware';
import apiRoutes from './routes';
import usersRouter from './routes/user.routes';
import environmentsRouter from './routes/ambientes.routes';
import equipmentRouter from './routes/equipamientos.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/v1', apiRoutes);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/environments', environmentsRouter);
app.use('/api/v1/equipment', equipmentRouter);

app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'ControlLabs API operando correctamente',
    timestamp: new Date().toISOString()
  });
});


app.get('/__test/error', (_req, _res, next) => {
  next(new Error('Error de prueba'));
});

app.use(globalErrorHandler);

export default app;