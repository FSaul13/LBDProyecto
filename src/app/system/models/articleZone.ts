import { Article } from './article';
import { DistributionZone } from './distributionZone';

export class ArticleZone{
    _idArticuloZona:number;
    _idArticulo:number;
	_articulo:Article;
	_idZonaReparto:number;
	_zonaReparto:DistributionZone;
	_isEnabled:boolean;
	_precioReparto:number;

}