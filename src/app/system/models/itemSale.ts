import { Article } from './article';
import { ArticleItem } from './articleItem';
import { Sale } from './sale';

export class ItemSale{
    _idPartidaVenta:number;
	_cantidad:number;
	_precioUnitario:number;
	_nota:String;
	_idArticulo:number;
	_articulo:Article;
	_idItemArticulo:number;
	_itemArticulo:ArticleItem;
	_idVenta:number;
	_venta:Sale;
	_isEnabled:boolean;

}