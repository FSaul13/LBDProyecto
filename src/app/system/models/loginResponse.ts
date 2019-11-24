
import { User } from './user';

export class LoginResponse {
	_Success: boolean;
	_Token: string;
	_IdTipoUsuario: number;
	_Usuario: User;
	_Message: string;

}