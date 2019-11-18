import { ColumnsCollapseTable } from './column-callapseTable.model'
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ButtonTableMode } from './buttons-table.model';
import { InitFilters } from './init-filters.model';

export class SettingsCollapseTable{
    _id:string;
    _title:string;
    _columns:ColumnsCollapseTable[];
    _rows:any[]|Observable<any[]>;
    _settings:SettingsCollapseTable;
    _traslate:any;
    _buttons:ButtonTableMode[];
    _tableClass:string;
    _initFilters:InitFilters[];
}