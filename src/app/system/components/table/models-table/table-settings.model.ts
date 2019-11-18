import { TableButtons } from './table-buttons.model';
import { TablePagination } from './table-pagination.model';
import { TableSearch } from './taable-search.model';
export class TableSettings {
    buttons: TableButtons;
    pagination: TablePagination;
    search: TableSearch;
    _actionsTitle: string;
    _id: string;
    _headerColor: string;
    _translate:any;
}