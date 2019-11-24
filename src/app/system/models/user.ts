import { TypeUser } from './typeUser';
import { Login } from './login';


export class User {
	_idUsuario: number;
	_nombre: string;
	_apellidos: string;
	_correo: string;
	_password: string;
	_tipoUsuario: TypeUser;
	_idTipoUsuario: number;
	_isEnabled: boolean;
	_idGoogle: string;
	_idFacebook: string;
	_imagenPerfil: string;
	_imgPortada: string;
	_isBlackList: boolean;
	_login: Login;
	_idFirebase: string;
	_token: string;
	_versionDispositivo: number;
	_idTipoDispositivo: number;
	_recibirMensaje: boolean;
	_passwordAnterior: string;



}