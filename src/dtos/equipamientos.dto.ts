export type EstadoEquipo = 'disponible' | 'prestado' | 'mantenimiento' | 'baja';

export interface CreateEquipmentDto {
  nombre: string;
  serial: string;
  estado: EstadoEquipo;
  ambienteId: string;
}

export type UpdateEquipmentDto = Partial<CreateEquipmentDto>;