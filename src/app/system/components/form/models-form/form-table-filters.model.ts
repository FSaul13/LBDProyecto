import { Observable } from 'rxjs';

export class FormTableFilters {
    //Identificador para el filtro
    id: string;

    //tipo de filtro 'text'|'select'
    type: string;

    //label del filtro
    label: string;

    //opciones del filtro select
    data: Observable<any[]>;

    //columna valor para el value del select
    key: string;

    //mostrar en el select la opcion "todos"
    allOption: boolean;

    //columna valor para mostrar en el option del select
    value: string;

    //Columna de la tabla que filtrara
    filterColum: string;
    
    
    filterValue: string;
}