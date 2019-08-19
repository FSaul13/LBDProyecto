import { Headquarters } from './headquarters';
import { DistributionZonePoints } from './distributionZonePoints';

export class DistributionZone{
    _idZonaReparto:number;
	_nombre:string;
	_descripcion:string;
	_precioDefault:number;
	_idSede:number;
	_sede:Headquarters;
	_isEnabled:boolean;
	_puntosZonaReparto:DistributionZonePoints[];

}