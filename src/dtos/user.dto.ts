export type RolUsuario = 'estudiante' | 'docente' | 'administrador';
export type EstadoCuenta = 'activo' | 'inactivo' | 'bloqueado';

export interface CreateUserDto {
  nombre: string;
  correo: string;
  documento: string;
  rol: RolUsuario;
  contrasena: string;
}

export interface UpdateUserDto {
  rol?: RolUsuario;
  estadoCuenta?: EstadoCuenta;
  contrasena?: string;
} 
