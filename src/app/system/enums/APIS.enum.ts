export enum APIS_ENUM {
    POST_LOGIN = "/api/login/User",
    POST_LOGOUT = "/api/login/close",
    GET_DATA_LOGGED_USER = "/api/login/datosSesion/?",
    GET_USERS = "/api/usuarios",
    POST_NEW_USER = "/api/usuarios/nuevo",
    GET_USER_TYPE = "/api/tiposUsuarios",
    GET_USER_BY_ID = "/api/usuarios/idUsuario/?",
    POST_EDIT_USER = "/api/usuarios/editar",
    POST_NEW_USER_TYPE = "/pruebaPost.php",
    POST_EDIT_USER_TYPE = "/pruebaPost.php",
    GET_USER_TYPE_BY_ID = "/pruebaPost.php",
    POST_DELETE_USER = "/api/usuarios/eliminar",
    POST_DELETE_USER_TYPE = "/pruebaPost.php",
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

    GET_PRUEBA = '/pruebaPost.php',
    POST_PRUEBA = '/pruebaPost.php',


    //Proyecto
    GET_ANIMAL = '/abc_animal.php',
    POST_NEW_ANIMAL = '/abc_animal.php',
    GET_ANIMAL_BY_ID = '/abc_animal.php',
    POST_EDIT_ANIMAL = '/abc_animal.php',
    POST_DELETE_ANIMAL = '/abc_animal.php',
    GET_DELETE_ANIMAL = '/abc_animal.php',
    POST_ACTIVATE_ANIMAL = '/abc_animal.php',

    //ALIMENT
    GET_ALIMENT = '/abc_alimento.php',
    POST_NEW_ALIMENT = '/abc_alimento.php',
    GET_ALIMENT_BY_ID = '/abc_alimento.php',
    POST_EDIT_ALIMENT = '/abc_alimento.php',
    POST_DELETE_ALIMENT = '/abc_alimento.php',
    GET_DELETE_ALIMENT = '/abc_alimento.php',
    POST_ACTIVATE_ALIMENT = '/abc_alimento.php',

    //ENFERMEDAD
    GET_ENFERMEDAD = '/abc_enfermedad.php',
    POST_NEW_ENFERMEDAD = '/abc_enfermedad.php',
    GET_ENFERMEDAD_BY_ID = '/abc_enfermedad.php',
    POST_EDIT_ENFERMEDAD = '/abc_enfermedad.php',
    POST_DELETE_ENFERMEDAD = '/abc_enfermedad.php',
    GET_DELETE_ENFERMEDAD = '/abc_enfermedad.php',
    POST_ACTIVATE_ENFERMEDAD = '/abc_enfermedad.php',

    //mEDICAMENTO
    //ENFERMEDAD
    GET_MEDICAMENTO = '/abc_medicamento.php',
    POST_NEW_MEDICAMENTO = '/abc_medicamento.php',
    GET_MEDICAMENTO_BY_ID = '/abc_medicamento.php',
    POST_EDIT_MEDICAMENTO = '/abc_medicamento.php',
    POST_DELETE_MEDICAMENTO = '/abc_medicamento.php',
    GET_DELETE_MEDICAMENTO = '/api/sites/eliminados',
    POST_ACTIVATE_MEDICAMENTO = '/api/sites/activar',


    //animal alimento
    GET_ANIMAL_ALIMENTO = '/api/sites',
    POST_NEW_ANIMAL_ALIMENTO = '/api/sites/nuevo',
    GET_ANIMAL_ALIMENTO_BY_ID = '/api/sites/idSite/?',
    POST_EDIT_ANIMAL_ALIMENTO = '/api/sites/editar',
    POST_DELETE_ANIMAL_ALIMENTO = '/api/sites/eliminar',
    GET_DELETE_ANIMAL_ALIMENTO = '/api/sites/eliminados',
    POST_ACTIVATE_ANIMAL_ALIMENTO = '/api/sites/activar',


    //tratamiento

    GET_TRATAMIENTO = '/abc_tratamiento.php',
    POST_NEW_TRATAMIENTO = '/abc_tratamiento.php',
    GET_TRATAMIENTO_BY_ID = '/abc_tratamiento.php',
    POST_EDIT_TRATAMIENTO = '/abc_tratamiento.php',
    POST_DELETE_TRATAMIENTO = '/abc_tratamiento.php',
    GET_DELETE_TRATAMIENTO = '/abc_tratamiento.php',
    POST_ACTIVATE_TRATAMIENTO = '/abc_tratamiento.php',

    //sintoma
    GET_SINTOMA = '/abc_sintoma.php',
    POST_NEW_SINTOMA = '/abc_sintoma.php',
    GET_SINTOMA_BY_ID = '/abc_sintoma.php',
    POST_EDIT_SINTOMA = '/abc_sintoma.php',
    POST_DELETE_SINTOMA = '/abc_sintoma.php',
    GET_DELETE_SINTOMA = '/abc_sintoma.php',
    POST_ACTIVATE_SINTOMA = '/abc_sintoma.php',


    GET_DETALLE_TRATAMIENTO = '/abc_detalleTratamiento.php'

}