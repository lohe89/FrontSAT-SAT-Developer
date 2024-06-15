export class ConfiguracionConstante {
	public API_ENDPOINT = "https://localhost:7287/";
	//public API_ENDPOINT = "https://proweb2021.ddns.net:7287/";
	 //public API_ENDPOINT = "http://187.148.99.86:7287/";
}

export class LoginConstante {
    public URLLogin = "login";
}

export class UsuarioConstante {
	public URLIniciarSesion = "api/Usuario/IniciarSesion";
	public URLListar = "api/Usuario/Lista";
	public URLGuardar = "api/Usuario/GuardarUsuario";
	public URLEditar = "api/Usuario/EditarUsuario";
	public URLEliminar = "api/Usuario/EliminarUsuario/";
}

export class RolConstante{
	public URLListar = "api/Rol/Lista";
}

export class MenuConstante{
	public URLListar = "api/Menu/Lista?idUsuario=";
}

export class ContribuyenteConstante {
	public URLObtenerAllContribuyentes = "contribuyente/obtenerAllContribuyentes";	
    public URLObtenerContribuyenteId = "contribuyente/obtenerContribuyenteId";
    public URLCrearContribuyente = "contribuyente/crearContribuyente";
    public URLEliminarContribuyente = "contribuyente/eliminarContribuyente?id=";
}

export class ActividadEconomicaConstante{
	public URLObtenerLstActividadContribuyente = "actividadEconomica/getLstActividadContribuyente";
}

export class RegimenFiscalConstante{
	public URLObtenerLstRegimenContribuyente = "regimenFiscal/getLstRegimenContribuyente";
}

export class ConstanciaSituacionFiscalConstante{
    public URLCargaCSF = "CargaCSF"
}

export class FormularioConstante {
	public URLFormularios = "formulario/";
	public URLModulosSinSeleccionar = "modulos/getunselect";
	public URLMenuSubmenuPorGrupo = "grupo/formularios/?GrupoID=";
	public URLMenuSubmenuPermisosPorPosicionGrupo = "grupo/formularios/ObtenerPorPosicionGrupo";
	public URLMenuSubmenuPermisosPorGrupo = "grupo/formulariosPorGrupo?GrupoID=";
}

export class DescargaMasivaConstante{
	public URLDescargaMasiva = "SAT/descargaMasivaXML";	
	public URLValidarSolicitud = "SAT/validarSolicitud";	
	public URLSolicitudesContribuyente = "SAT/solicitudesContribuyente";	
}