import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TableSettings } from '../models-table/table-settings.model';
import { TableButtons } from '../models-table/table-buttons.model';
import { TablePagination } from '../models-table/table-pagination.model';
import { TableSearch } from '../models-table/taable-search.model';
import { TableExtraButtons } from '../models-table/table-extra-buttons.model';
import { map, tap } from 'rxjs/operators';

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

  constructor() { }

  ngOnInit() {
    this.fnLoadSettings();
    let index = 0;
    this.arrayObsAny_data.subscribe(arrayAny_data => {
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
  }


  fnLoadSettings(): void {
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
        /*
        for (let index = 0; index < buttons.extraButtons.length; index++) {
          this.any_hoverExtraButtons[index] = {}

        }
        
        */
       this.arrayExtraButtons_buttons.push(...buttons.extraButtons);
      }
      if (buttons.colors) {
        this.str_buttonsColor = this.any_settings.buttons.colors.normal;
        this.str_buttonsHoverColor = this.any_settings.buttons.colors.hover;
      }
      if (buttons.editIcon) {
        this.str_editIcon = this.any_settings.buttons.editIcon
      }
      if (buttons.deleteIcon) {
        this.str_deleteIcon = this.any_settings.buttons.deleteIcon;
      }
    }
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
      if (search.placeholder) {
        this.str_search = search.placeholder;
      }
      if (search.searchColumns) {
        this.arrayStr_searchColumns.push(...search.searchColumns);
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

  arrayObs_sortTable:Observable<any[]>;
  str_sortColumn:string = null;
  flag:number = -1;
  fnSortByColumn(str_columnName: string) {
    if(this.bln_loadOnChangePage){
      return;
    }
    if(this.str_sortColumn == str_columnName){
      this.flag *= -1;
    }else{
      this.flag = 1;
      this.str_sortColumn = str_columnName;
    }
    
    this.arrayObs_sortTable = this.arrayObsAny_data.pipe(
      map(values => {
        return values.sort( (a, b)=> {
          if (a[str_columnName] > b[str_columnName]) {
            return 1 * this.flag;
          }
          if (a[str_columnName] < b[str_columnName]) {
            return -1 * this.flag;
          }
          return 0;
        });;
      })
    );
  }

  fnResetSortTableData():void{
    
  }

}
