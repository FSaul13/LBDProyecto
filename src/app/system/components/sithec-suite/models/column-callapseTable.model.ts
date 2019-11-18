import { Observable } from 'rxjs';

export class ColumnsCollapseTable{
    _columnTitle:string;
    _columnName:string;
    _type:string;//static|text|number|select
    _readOnly:boolean;
    _filter:boolean;
    _filterPlaceholder:string;
    _key:string;
    _value:string;
    _options:any[]|Observable<any[]>;
}