import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { isObservable } from "rxjs";
import { SettingsCollapseTable } from '../../models/settings-collapseTable.model';
import { ButtonTableMode } from '../../models/buttons-table.model';
import { SithecSuiteService } from '../../sithec-suite.service';
import { InitFilters } from '../../models/init-filters.model';

@Component({
  selector: 'sithec-collapse-table',
  templateUrl: './collapse-table.component.html',
  styleUrls: ['./collapse-table.component.css']
})
export class TableComponent implements OnInit {

  @Input() settings: SettingsCollapseTable;
  @Output() onOpenTableChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickInitFilters: EventEmitter<any> = new EventEmitter<any>();
  @Input() father: any;
  @Input() disabled: boolean;

  bln_enableInitFiltersButton: boolean;

  str_filtersBotton: string = 'Ver filtros';

  num_columns: number = 1;

  num_openCollapse: number = -1;

  obs_rows: Observable<any[]>;

  any_openRow: any;

  str_tableTitle: string;

  bln_showFilters: boolean = true;

  bln_hasFilters: boolean = false;

  any_filtersData: any = {};

  any_traslate: any = null;

  buttons: ButtonTableMode[];

  str_tableClass: string = '';

  tableInfo: any;

  bln_showSpinner: boolean = false;

  sub_spinners: Subscription;
  sub_rows: Subscription;

  any_selectOptions: any = {};
  any_radioOptions: any = {};

  initFilters: InitFilters[] = null;
  str_headerColor: "#fffff";

  initFiltersInputs: any = {};
  constructor(
    private sithecSuite: SithecSuiteService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fnInitCollapseTable();
    this.fnCheckSpinnerChange();
    this.fnCheckRows();
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if (this.sub_spinners) {
      this.sub_spinners.unsubscribe();
    }
    if (this.sub_rows) {
      this.sub_rows.unsubscribe();
    }
  }

  fnCheckRows(): void {
    this.sub_rows = this.sithecSuite._rows.subscribe(data => {

      data.forEach(rowsData => {
        if (rowsData._id == this.settings._id) {
          console.log('Revisando tabla = ' + this.settings._id + '; disabled = ' + this.disabled)
          if (!rowsData._check) {
            this.fnLoadRows(rowsData._rows);
            this.sithecSuite.fnCheckRows(this.settings._id)
          }

        }
      });

    });
  }

  fnCheckSpinnerChange(): void {
    this.sub_spinners = this.sithecSuite._spinner.subscribe(data => {
      data.forEach(spinner => {
        if (spinner._id == this.settings._id) {
          if (!spinner._check) {
            this.bln_showSpinner = spinner._state;
            this.sithecSuite.fnCheckSpinner(this.settings._id)
          }

        }
      });
    });
  }

  fnInitCollapseTable(): void {
    this.num_columns = this.settings._columns.length + 1;
    this.str_tableTitle = (this.settings._title) ? this.settings._title : '';
    this.fnSetSettingsConfig();
    this.fnLoadRows(this.settings._rows);
  }

  private fnSetSettingsConfig(): void {
    this.any_traslate = (this.settings._traslate) ? (this.settings._traslate) : null;
    this.str_tableClass = (this.settings._tableClass) ? (this.settings._tableClass) : '';
    this.fnFiltersConfig();
    this.fnButtonsConfig();
  }

  private fnFiltersConfig(): void {

    if (this.settings._initFilters) {
      this.bln_enableInitFiltersButton = true;
      this.initFilters = this.settings._initFilters;
      this.initFilters.forEach(data => {
        console.log(data);
        if (data._required) {
          this.bln_enableInitFiltersButton = false;
        }
      });
    } else {
      this.initFilters = null;
    }
    if (this.settings._columns) {
      this.settings._columns.forEach(column => {
        if (column._filter) {
          this.bln_hasFilters = true;
        }
        if (column._type == 'select') {
          if (!isObservable(column._options)) {
            this.any_selectOptions[column._columnName] = new BehaviorSubject<any[]>(column._options).asObservable();
          } else {
            this.any_selectOptions[column._columnName] = column._options;
          }
        }
        if (column._type == 'radio') {
          if (!isObservable(column._options)) {
            this.any_radioOptions[column._columnName] = new BehaviorSubject<any[]>(column._options).asObservable();
          } else {
            this.any_radioOptions[column._columnName] = column._options;
          }
        }
      })
    }
  }
  private fnButtonsConfig(): void {
    if (this.settings._buttons) {
      this.buttons = this.settings._buttons
    } else {
      this.buttons = [];
    }
  }

  fnLoadRows(rows: Observable<any[]> | any[]): void {
    this.num_openCollapse = -1;
    if (!rows) {
      return;
    }
    if (!isObservable(rows)) {
      this.obs_rows = new BehaviorSubject<any[]>(rows).asObservable();
    } else {
      this.obs_rows = rows;
    }
  }



  fnOpenCollapseTable(num_index: number, row: any): void {
    let event: any = {
      _idTable: this.settings._id,
      _idChildTable: (this.settings._settings._id) ? this.settings._settings._id : null,
      _closeRow: (this.any_openRow) ? this.any_openRow : null
    };

    if (this.num_openCollapse == num_index) {
      event._openTable = null;
      this.num_openCollapse = -1;
      this.any_openRow = null;
    } else {
      this.tableInfo = {
        _father: this.father,
        _id: this.settings._id,
        _openRow: row,
      }
      event._openRow = row;
      this.num_openCollapse = num_index;
      this.any_openRow = row;
    }
    try {
      this.cdr.detectChanges();
    } catch (e) {

    }
    this.onOpenTableChange.emit(event);
  }

  fnShowHideFilters(): void {
    this.bln_showFilters = !this.bln_showFilters;
    this.str_filtersBotton = this.bln_showFilters ? 'Esconder filtros' : 'Ver filtros';
  }

  fnGetTraslate(str_column: string): Observable<string> {
    let $traslate: BehaviorSubject<string> = new BehaviorSubject<string>('');
    this.any_traslate.get(str_column).subscribe(field => {
      $traslate.next(field);
    });
    return $traslate.asObservable();
  }

  fnButtonClick(button: ButtonTableMode, row: any): void {
    let event = {
      _idButton: button._id,
      _data: {
        _idTable: this.settings._id,
        _row: row,
        _fatherTable: this.father
      }
    }
    this.onClickButton.emit(event);
  }

  fnEmitTableButtonEvent(event) {
    this.onClickButton.emit(event);
  }

  fnEmitTableChangeEvent(event) {
    this.onOpenTableChange.emit(event);
  }

  fnInitFiltersClick(): void {
    let event = {
      _id: this.settings._id,
      _data: this.initFiltersInputs
    }
    this.onClickInitFilters.emit(event)
    console.log(event)
  }

  fnInitFilterUpdate(event, id): void {
    let value = (event.target || event.srcElement).value
    this.initFiltersInputs[id] = value;
    if (this.initFiltersInputs[id] == "") {
      delete this.initFiltersInputs[id];
    }
    let bln_enableButton: boolean = true;
    this.initFilters.forEach(data => {
      if (data._required) {
        if (!this.initFiltersInputs[data._id]) {
          bln_enableButton = false;
        }
      }
    });
    this.bln_enableInitFiltersButton = bln_enableButton;
  }

  fnEmitInitFilters(event): void {
    this.onClickInitFilters.emit(event);
  }

}
