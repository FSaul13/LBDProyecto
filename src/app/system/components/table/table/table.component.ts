import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { TableSettings } from '../models-table/table-settings.model';
import { TableButtons } from '../models-table/table-buttons.model';
import { TablePagination } from '../models-table/table-pagination.model';
import { TableSearch } from '../models-table/taable-search.model';
import { TableExtraButtons } from '../models-table/table-extra-buttons.model';
import { map, tap } from 'rxjs/operators';
import { SithecTableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Output() eventEmmiter_delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmmiter_changePage: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmmiter_edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmmiter_extraButtons: EventEmitter<any> = new EventEmitter<any>();

  @Input() arrayAny_columns: any[];
  @Input() arrayObsAny_data: Observable<any[]>;
  @Input() any_settings: TableSettings;

  translate:any;

  bln_showActionColumn: boolean;
  bln_showDelete: boolean;
  bln_showEdit: boolean;
  bln_showExtras: boolean;
  bln_hoverDelete: boolean[] = [];
  bln_hoverEdit: boolean[] = [];
  any_hoverExtraButtons: any = {}
  str_buttonsColor: string = "blue";
  str_buttonsHoverColor: string = "red";
  str_deleteIcon: string = "fas fa-trash table-button";
  str_editIcon: string = "fas fa-pen table-button";
  arrayExtraButtons_buttons: TableExtraButtons[] = []

  bln_loadOnChangePage: boolean;
  str_nextLabel: string = "Next";
  str_previousLabel: string = "Previous";
  num_actualPage: number = 1;
  num_itemsPerPage: number = 5;


  str_search: string = "Buscar..."
  arrayStr_searchColumns = [];
  searchText: string;
  str_headerColor: string = '#fffff';

  constructor(
    private tableService: SithecTableService
  ) {

    this._any_spinnerObs = this.tableService._any_tableSpinner;
  }

  bln_showSpinner: boolean;

  arrayAny_rows: any[] = [];


  _any_spinnerObs: Observable<any>;
  str_idTable: string;
  ngOnInit() {
    this.translate = this.any_settings._translate;
    this.str_idTable = this.any_settings._id;
    this.fnLoadSettings();
    let index = 0;
    this.arrayObsAny_data.subscribe(arrayAny_data => {
      if (arrayAny_data.length > 0) {
        this.bln_showSpinner = false;
      } else {
        this.bln_showSpinner = true;
      }
      arrayAny_data.forEach(any_data => {
        let str_searchField = "";
        this.arrayStr_searchColumns.forEach(str_column => {
          str_searchField = str_searchField + " " + any_data[str_column];
        });
        any_data.str_searchField = str_searchField;
        this.any_hoverExtraButtons[index] = {}
        index++;
      });
    });
    this.arrayObs_sortTable = this.arrayObsAny_data

    this.subscription_abcFilter = this.arrayObs_sortTable.subscribe(data => {
      this.arrayAny_rows = data;
    })
  }


  fnLoadSettings(): void {
    this.fnRefreshButtonSettings();
    if (this.any_settings.pagination) {
      let paggination: TablePagination = this.any_settings.pagination;
      this.bln_loadOnChangePage = paggination.loadOnChange;
      if (paggination.nextLabel) {
        this.str_nextLabel = paggination.nextLabel;
      }
      if (paggination.prebiousLabel) {
        this.str_previousLabel = paggination.prebiousLabel;
      }
      if (paggination.itemsPerPage) {
        this.num_itemsPerPage = paggination.itemsPerPage;
      }
    }
    if (this.any_settings.search) {
      let search: TableSearch = this.any_settings.search;
      /*
      if (search.placeholder) {
        this.str_search = search.placeholder;
      }
      */
      if (search.searchColumns) {
        this.arrayStr_searchColumns.push(...search.searchColumns);
      }
    }
    if (this.any_settings._headerColor) {
      this.str_headerColor = this.any_settings._headerColor;
    }
  }

  public fnRefreshButtonSettings(): void {
    this.bln_showActionColumn = false;
    this.bln_showDelete = false;
    this.bln_showEdit = false;
    this.bln_showExtras = false;
    this.arrayExtraButtons_buttons = [];
    this.str_buttonsColor = "blue";
    this.str_buttonsHoverColor = "red";
    this.str_deleteIcon = "fas fa-trash table-button";
    this.str_editIcon = "fas fa-pen table-button";
    if (this.any_settings.buttons) {
      let buttons: TableButtons = this.any_settings.buttons;
      if (buttons.delete) {
        this.bln_showActionColumn = true;
        this.bln_showDelete = true;
      }
      if (buttons.edit) {
        this.bln_showActionColumn = true;
        this.bln_showEdit = true;
      }
      if (buttons.extras) {
        this.bln_showActionColumn = true;
        this.bln_showExtras = true;
        this.arrayExtraButtons_buttons.push(...buttons.extraButtons);
      }
      if (buttons.colors) {
        this.str_buttonsColor = this.any_settings.buttons.colors.normal;
        //this.str_buttonsHoverColor = this.any_settings.buttons.colors.hover;
        //this.str_buttonsColor = '#004288';
        this.str_buttonsHoverColor = this.any_settings.buttons.colors.hover;
        console.log(this.str_buttonsColor + "mas" + this.str_buttonsHoverColor)
      }
      if (buttons.editIcon) {
        this.str_editIcon = this.any_settings.buttons.editIcon
      }
      if (buttons.deleteIcon) {
        this.str_deleteIcon = this.any_settings.buttons.deleteIcon;
      }
    }
  }

  fnDeleteRow(any_rowData: any): void {
    let any_event: any = {
      data: any_rowData,
      fnConfirmDelete: () => {
        console.log("Eliminar", any_rowData)
        any_rowData.hideRowData = true;
      }
    }
    this.eventEmmiter_delete.emit(any_event)
  }

  fnEditRow(any_rowData: any): void {
    this.eventEmmiter_edit.emit({ data: any_rowData });
  }

  fnChangePage(event): void {
    if (this.bln_loadOnChangePage) {
      let any_event: any = {
        page: event,
        fnChangePage: () => {
          this.num_actualPage = event;
        }
      }
      this.eventEmmiter_changePage.emit(any_event);
    } else {
      this.num_actualPage = event;
    }
  }

  fnOnExtraButtonClick(extraButton_button: TableExtraButtons, data): void {
    this.eventEmmiter_extraButtons.emit({ name: extraButton_button.name, data: data });
  }
  subscription_abcFilter: Subscription;

  arrayObs_sortTable: Observable<any[]>;
  str_sortColumn: string = null;
  flag: number = -1;
  fnSortByColumn(str_columnName: string) {
    if (this.bln_loadOnChangePage) {
      return;
    }
    if (this.str_sortColumn == str_columnName) {
      this.flag *= -1;
    } else {
      this.flag = 1;
      this.str_sortColumn = str_columnName;
    }

    this.arrayObs_sortTable = this.arrayObsAny_data.pipe(
      map(values => {
        return values.sort((a, b) => {
          if (a[str_columnName] > b[str_columnName]) {
            return 1 * this.flag;
          }
          if (a[str_columnName] < b[str_columnName]) {
            return -1 * this.flag;
          }
          return 0;
        });;
      })
    )
    if (this.subscription_abcFilter) {
      this.subscription_abcFilter.unsubscribe();
    }
    this.subscription_abcFilter = this.arrayObs_sortTable.subscribe(data => {
      this.arrayAny_rows = data;
    })
  }

  fnGetTranslate(str_translate:string):Observable<string>{
    let $obj:BehaviorSubject<string> = new BehaviorSubject<string>(str_translate?str_translate:'not-found');
    this.translate.get(str_translate?str_translate:'not-found').subscribe(data=>{
      $obj.next(data)
    });
    return $obj.asObservable();
  }

}
