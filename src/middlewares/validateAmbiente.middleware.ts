import { Request, Response, NextFunction } from "express";
import { CreateAmbienteDto, UpdateAmbienteDto } from "../dtos/ambientes.dto";

export const validateCreateAmbiente = (
  req: Request<{}, {}, CreateAmbienteDto>,
  res: Response,
  next: NextFunction
) => {
  const { nombre, ubicacion, capacidad } = req.body;
  const errors: string[] = [];

  if (!nombre || typeof nombre !== "string") errors.push("nombre es obligatorio (string)");
  if (!ubicacion || typeof ubicacion !== "string") errors.push("ubicacion es obligatoria (string)");
  if (typeof capacidad !== "number" || capacidad <= 0) errors.push("capacidad debe ser un número mayor a 0");

  if (errors.length) return res.status(400).json({ message: "Datos inválidos", errors });
  next();
};

export const validateUpdateAmbiente = (
  req: Request<{ id: string }, {}, UpdateAmbienteDto>,
  res: Response,
  next: NextFunction
) => {
  const { nombre, ubicacion, capacidad } = req.body;
  const errors: string[] = [];

  if (Object.keys(req.body).length === 0) errors.push("Debes enviar al menos un campo");
  if (nombre !== undefined && typeof nombre !== "string") errors.push("nombre debe ser string");
  if (ubicacion !== undefined && typeof ubicacion !== "string") errors.push("ubicacion debe ser string");
  if (capacidad !== undefined && (typeof capacidad !== "number" || capacidad <= 0)) errors.push("capacidad debe ser un número mayor a 0");

  if (errors.length) return res.status(400).json({ message: "Datos inválidos", errors });
  next();
};