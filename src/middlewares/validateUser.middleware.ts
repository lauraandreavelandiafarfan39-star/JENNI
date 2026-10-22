
import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from '../dtos/user.dto';

const ROLES = ['estudiante', 'docente', 'administrador'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateCreateUser = (
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
  next: NextFunction
): void => {
  const { nombre, correo, documento, rol, contrasena } = req.body;
  const errors: string[] = [];

  if (!nombre || typeof nombre !== 'string') errors.push('nombre es obligatorio (string)');
  if (!correo || !EMAIL_REGEX.test(correo)) errors.push('correo debe ser un email válido');
  if (!documento || typeof documento !== 'string') errors.push('documento es obligatorio (string)');
  if (!rol || !ROLES.includes(rol)) errors.push(`rol debe ser uno de: ${ROLES.join(', ')}`);
  if (!contrasena || typeof contrasena !== 'string' || contrasena.length < 8)
    errors.push('contrasena es obligatoria (mínimo 8 caracteres)');

  if (errors.length) {
    res.status(400).json({ success: false, message: 'Datos inválidos', errors });
    return;
  }
  next();
};