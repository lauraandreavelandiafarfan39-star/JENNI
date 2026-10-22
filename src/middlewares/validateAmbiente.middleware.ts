
import { Request, Response, NextFunction } from 'express';
import { CreateAmbienteDto } from '../dtos/ambientes.dto';

export const validateCreateAmbiente = (
  req: Request<{}, {}, CreateAmbienteDto>,
  res: Response,
  next: NextFunction
): void => {
  const { nombre, ubicacion, capacidad } = req.body;
  const errors: string[] = [];

  if (!nombre || typeof nombre !== 'string') errors.push('nombre es obligatorio (string)');
  if (!ubicacion || typeof ubicacion !== 'string') errors.push('ubicacion es obligatoria (string)');
  if (typeof capacidad !== 'number' || capacidad <= 0) errors.push('capacidad debe ser un número mayor a 0');

  if (errors.length) {
    res.status(400).json({ success: false, message: 'Datos inválidos', errors });
    return;
  }
  next();
};