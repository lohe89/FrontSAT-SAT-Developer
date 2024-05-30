export interface UsuarioAPI {
    idUsuario: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    password: string;
    idRol: number;
    rolDescripcion: string;
    activo: number;
}
