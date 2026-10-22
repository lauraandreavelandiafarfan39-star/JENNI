
export type RolUsuario = 'estudiante' | 'docente' | 'administrador';

export interface CreateUserDto {
  nombre: string;
  correo: string;
  documento: string;
  rol: RolUsuario;
  contrasena: string;
}