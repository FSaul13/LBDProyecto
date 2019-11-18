import { FormTableFilters } from './form-table-filters.model';
import { FormTableFiltersLayout } from './FormTableFiltersLayput.model';
export class FormTableFiltersSettings{
    //Filtros de la tabla
    filters:FormTableFilters[];

    //layout de bootstrapo para los filtros
    layout:FormTableFiltersLayout;
}