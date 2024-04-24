export class ConfiguracionConstante {
	public API_ENDPOINT = "https://localhost:7287/";
}

export class LoginConstante {
    public URLLogin = "login";
}

export class UsuarioConstante {
	public URLUsuarios = "usuario/obtenerAllUsuarios";
	public URLObtenerUsuariosID = "usuario/obtenerUsuarioId";
	public URLActualizarPassword = "usuario/actualizarPassword";
	public URLResetearPassword = "usuario/resetearPassword";
	public URLActualizaUsuario = "usuario/actalizarUsuario";
	public URLObtenerUsuarioSinActualizaPassword = 'usuario/sinActualizarPassword';
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