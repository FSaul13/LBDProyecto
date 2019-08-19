export enum APIS_ENUM{
    POST_LOGIN = "/api/login/User",
    POST_LOGOUT = "/api/login/close",
    GET_DATA_LOGGED_USER = "/api/login/datosSesion/?",
    GET_USERS = "/api/usuarios",
    POST_NEW_USER = "/api/usuarios/nuevo",
    GET_USER_TYPE = "/api/tiposUsuarios",
    GET_USER_BY_ID = "/api/usuarios/idUsuario/?",
    POST_EDIT_USER = "/api/usuarios/editar",
    POST_NEW_USER_TYPE = "/api/tiposUsuarios/nuevo",
    POST_EDIT_USER_TYPE = "/api/tiposUsuarios/editar",
    GET_USER_TYPE_BY_ID = "/api/tiposUsuarios/idTipoUsuario/?",
    POST_DELETE_USER = "/api/usuarios/eliminar",
    POST_DELETE_USER_TYPE = "/api/tiposUsuarios/eliminar",
    POST_RESET_USER_PASSWORD = "/api/usuarios/pasword/nuevo",
    POST_CHANGE_USER_PASSWORD = "/api/usuarios/pasword/editar"
}