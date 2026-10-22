import { Request, Response, NextFunction } from 'express';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

const ROLES = ['estudiante', 'docente', 'administrador'];
const ESTADOS_CUENTA = ['activo', 'inactivo', 'bloqueado'];
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

export const validateUpdateUser = (
  req: Request<{ id: string }, {}, UpdateUserDto>,
  res: Response,
  next: NextFunction
): void => {
  const { rol, estadoCuenta, contrasena } = req.body;
  const errors: string[] = [];

  if (Object.keys(req.body).length === 0) errors.push('Debes enviar al menos un campo');
  if (rol !== undefined && !ROLES.includes(rol)) errors.push(`rol debe ser uno de: ${ROLES.join(', ')}`);
  if (estadoCuenta !== undefined && !ESTADOS_CUENTA.includes(estadoCuenta))
    errors.push(`estadoCuenta debe ser uno de: ${ESTADOS_CUENTA.join(', ')}`);
  if (contrasena !== undefined && (typeof contrasena !== 'string' || contrasena.length < 8))
    errors.push('contrasena debe tener mínimo 8 caracteres');

  if (errors.length) {
    res.status(400).json({ success: false, message: 'Datos inválidos', errors });
    return;
  }
  next();
};