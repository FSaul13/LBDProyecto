import { Observable } from 'rxjs';
import { FormErrors } from './form-errors.model';
import { FormTableFiltersSettings } from './form-table-filters-settings.model';
import { FormInitTable } from './form-init-table.model';
import { FormTablePagination } from './form-table-pagination.model';

export class FormInput{
    id:string;

    //Label del controller
    label:string;

    //placeholder del controles
    placeholder:string;

    //placeholder secundario del input de tags
    placeholderTag:string;

    //tipo de controlador 'text'|'number'|'select'|'table'|'password'|'tag'
    type:string;

    //opciones del select o renglones de la tabla
    options:Observable<any>;

    //Columna que sera value en el select
    key:string;

    //Columna que se mostrara en el texto del select
    value:string;

    //Errores que se mostraran en el control
    errors:FormErrors;

    //Esconder el control
    hide:boolean;

    //Ejecutar accion trim sobre el control al guardar cambios
    trim:boolean;

    //Filtros de la tabla
    tableFilters:FormTableFiltersSettings;

    //columnas de la tabla
    tableColumns:any[];//{title:"",name:""}

    //desabilitar header checkbox
    disbleHeaderCheck:boolean;

    //al hacer click en un checkbox contar cuantas columnas tienen el mismo valor
    countEquals:string[];

    _initTable:FormInitTable;

    _accept:string;

    _multipleFiles:boolean;

    _pagination:FormTablePagination;

    _selectLimit:number
}