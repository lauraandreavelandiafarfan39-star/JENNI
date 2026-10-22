
import { Request, Response, NextFunction } from 'express';
import { CreateEquipmentDto } from '../dtos/equipamientos.dto';

const ESTADOS = ['disponible', 'prestado', 'mantenimiento', 'baja'];

export const validateCreateEquipment = (
  req: Request<{}, {}, CreateEquipmentDto>,
  res: Response,
  next: NextFunction
): void => {
  const { nombre, serial, estado, ambienteId } = req.body;
  const errors: string[] = [];

  if (!nombre || typeof nombre !== 'string') errors.push('nombre es obligatorio (string)');
  if (!serial || typeof serial !== 'string') errors.push('serial es obligatorio (string)');
  if (!estado || !ESTADOS.includes(estado)) errors.push(`estado debe ser uno de: ${ESTADOS.join(', ')}`);
  if (!ambienteId || typeof ambienteId !== 'string') errors.push('ambienteId es obligatorio (string)');

  if (errors.length) {
    res.status(400).json({ success: false, message: 'Datos inválidos', errors });
    return;
  }
  next();
};