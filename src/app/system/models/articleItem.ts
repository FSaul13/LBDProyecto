import { Article } from './article';
import { StatusArticleItem } from './statusArticleItem';

export class ArticleItem{
    _idItemArticulo:number;
	_codigo:string;
	_idArticulo:number;
	_articulo:Article;
	_idStatusItemArticulo:number;
	_statusItemArticulo:StatusArticleItem;
	_isEnabled:boolean;

}