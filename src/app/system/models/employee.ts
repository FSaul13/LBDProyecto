import { ClientCompany } from './clientCompany';
import { TypeEmployee } from './typeEmployee';

export class Employee{
    _idEmpleado:number;
    _codigo:string;
    _nombre:string;
    _apellidos:string;
    _fechaIngreso:string;
    _correo:string;
	_password:string;
	_idTipoEmpleado:number;
	_tipoEmpleado:TypeEmployee;
	_idClienteEmpresa:number;
	_clienteEmpresa:ClientCompany;
	_isEnabled:boolean;
	_passwordAnterior:string;
	_imagenPerfil:string;

}