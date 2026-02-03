export interface Alumno {
  id: number;
  nombre: string;
  email: string;
  username: string;
  dni: string;
  direccion: string;
  fechanacimiento: string;
  activo: boolean;
}

export interface CreateAlumnoRequest {
  username: string;
  password: string;
  dni: string;
  nivelId: number;
  nombre: string;
  email: string;
  direccion: string;
  fechanacimiento: string;
  estado?: boolean;
}

export interface UpdateAlumnoRequest {
  username?: string;
  password?: string;
  dni?: string;
  nivelId?: number;
  nombre?: string;
  email?: string;
  direccion?: string;
  fechanacimiento?: string;
  estado?: boolean;
}
