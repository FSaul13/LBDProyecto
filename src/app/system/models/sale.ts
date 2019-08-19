import { Address } from './address';
import { Card } from './card';
import { User } from './user';
import { ClientCompany } from './clientCompany';
import { DistributionZone } from './distributionZone';
export class Sale{
    _idVenta:number;
	_total:number;
	_nota:string;
	_fecha:string;
	_cantidad:number;
	_idDireccion:number;
	_direccion:Address;
	_idZonaReparto:number;
	_zonaReparto:DistributionZone;
	_idTarjeta:number;
	_tarjeta:Card;
	_idUsuario:number;
	_usuario:User;
	_idClienteEmpresa:number;
	_clienteEmpresa:ClientCompany;
	_isEnabled:boolean;

}