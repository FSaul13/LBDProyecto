import { ClientCompany } from './clientCompany';
import { Addition } from './addition';
import { Image } from '@syncfusion/ej2-richtexteditor';
export class Article{
    _idArticulo:number;
    _nombre:string;
	_descripcion:string;
	_idClienteEmpresa:number;
	_clienteEmpresa:ClientCompany;
	_isEnabled:string;
	_aditamentos:Addition[];
	imagenes:Image[];
	_tokenArticulo:string;
}