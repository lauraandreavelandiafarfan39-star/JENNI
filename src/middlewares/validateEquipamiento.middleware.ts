import { Request, Response, NextFunction } from 'express';
import { CreateEquipmentDto, UpdateEquipmentDto } from '../dtos/equipamientos.dto';

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

export const validateUpdateEquipment = (
  req: Request<{ id: string }, {}, UpdateEquipmentDto>,
  res: Response,
  next: NextFunction
): void => {
  const { nombre, serial, estado, ambienteId } = req.body;
  const errors: string[] = [];

  if (Object.keys(req.body).length === 0) errors.push('Debes enviar al menos un campo');
  if (nombre !== undefined && typeof nombre !== 'string') errors.push('nombre debe ser string');
  if (serial !== undefined && typeof serial !== 'string') errors.push('serial debe ser string');
  if (estado !== undefined && !ESTADOS.includes(estado)) errors.push(`estado debe ser uno de: ${ESTADOS.join(', ')}`);
  if (ambienteId !== undefined && typeof ambienteId !== 'string') errors.push('ambienteId debe ser string');

  if (errors.length) {
    res.status(400).json({ success: false, message: 'Datos inválidos', errors });
    return;
  }
  next();
};