export interface Docente {
  id: number;
  username: string;
  titulo: string;
  estado: boolean;
  cuit: string;
  nombre: string;
  email: string;
  direccion: string;
  fechanacimiento: string;
}
export interface CreateDocenteRequest {
  username: string;
  password: string;
  titulo: string;
  cuit: string;
  nombre: string;
  email: string;
  direccion: string;
  fechanacimiento: string;
}

export interface UpdateDocenteRequest {
  username: string;
  password?: string;
  titulo: string;
  cuit: string;
  nombre: string;
  email: string;
  direccion: string;
  fechanacimiento: string;
}
