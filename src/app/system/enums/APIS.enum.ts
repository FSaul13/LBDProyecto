export enum APIS_ENUM {
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
    POST_CHANGE_USER_PASSWORD = "/api/usuarios/pasword/editar",
    POST_CHANGE_USER_PASSWORD_ADMIN = "/api/usuarios/pasword/administrador/editar",
    GET_TERRITORIES = "/api/territorios",
    POST_NEW_TERRITORIES = "/api/territorios/nuevo",
    POST_EDIT_TERRITORY = "/api/territorios/editar",
    GET_TERRITORY_BY_ID = "/api/territorios/idTerritorio/?",
    POST_DELETE_TERRITORY = "api/territorios/eliminar",
    GET_CLIENTS = "/api/clientes",
    POST_NEW_CLIENT = '/api/clientes/nuevo',
    GET_CLIENTS_BY_ID = "/api/clientes/idCliente/?",
    POST_EDIT_CLIENT = "/api/clientes/editar",
    GET_STATES = '/api/paises/?/estados',
    GET_COUNTRY = '/api/paises',

    GET_PRUEBA = '/prueba.php',
    POST_PRUEBA = '/pruebaPost.php',


    //Proyecto
    GET_ANIMAL = '/api/sites',
    POST_NEW_ANIMAL = '/api/sites/nuevo',
    GET_ANIMAL_BY_ID = '/api/sites/idSite/?',
    POST_EDIT_ANIMAL = '/api/sites/editar',
    POST_DELETE_ANIMAL = '/api/sites/eliminar',
    GET_DELETE_ANIMAL = '/api/sites/eliminados',
    POST_ACTIVATE_ANIMAL = '/api/sites/activar',

    //ALIMENT
    GET_ALIMENT = '/api/sites',
    POST_NEW_ALIMENT = '/api/sites/nuevo',
    GET_ALIMENT_BY_ID = '/api/sites/idSite/?',
    POST_EDIT_ALIMENT = '/api/sites/editar',
    POST_DELETE_ALIMENT = '/api/sites/eliminar',
    GET_DELETE_ALIMENT = '/api/sites/eliminados',
    POST_ACTIVATE_ALIMENT = '/api/sites/activar',


}