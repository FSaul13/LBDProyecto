import { SaleStatus } from './saleStatus';
import { Sale } from './sale';
export class TracingSale{
    _idSeguimientoVenta:number;
	_latitude:number;
	_longitude:number;
	_isDone:boolean;
	_idStatusVenta:number;
	_statusVenta:SaleStatus;
	_idVenta:number;
	_venta:Sale;
	_isEnabled:boolean;
	_fecha:string;
}