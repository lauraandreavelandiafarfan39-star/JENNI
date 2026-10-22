export interface CreateAmbienteDto {
  nombre: string;
  ubicacion: string;
  capacidad: number;
}

export type UpdateAmbienteDto = Partial<CreateAmbienteDto>;