import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators } from '@angular/forms';
import { FormTableFiltersSettings } from '../../models-form/form-table-filters-settings.model';
import { FormInput } from '../../models-form/form-input.model';
import { parse } from 'querystring';
import { FormService } from '../../form.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.css']
})
export class TableInputComponent implements OnInit {

  actual_page: number = 1;

  inputsValue: any = {};

  @Input() any_filters: FormTableFiltersSettings;

  @Input() anyArray_columns: any[];
  @Input() bln_translate: boolean;

  @Input() _tableData: Observable<any[]>;

  @Input() textInput_field: FormInput;

  @Output() eventEmitter_checkbox: EventEmitter<any> = new EventEmitter<any>();

  @Input() formcontrol_controller: FormControl;

  tableData: any[];

  any_checked: any = {};
  selectedData: any = {};

  formControl: FormControl = new FormControl(null, Validators.required);

  filters: any[];

  filtersValues: any = {}

  str_colXL: string = "col-lx-"
  str_colLG: string = "col-lg-"
  str_colMD: string = "col-md-"
  str_colSM: string = "col-sm-"
  str_colXS: string = "col-xs-"

  bln_hideCheckHeader: boolean;

  subscription_table: Subscription;
  subscription_initTable: Subscription;

  @Input() bln_disabledTableControls: boolean;

  constructor(
    private formService_tools: FormService
  ) { }

  ngOnInit() {
    this.subscription_initTable = this.formService_tools._initTable.subscribe(data=>{
      data.forEach(initTable=>{
        if(initTable._id == this.textInput_field.id && !initTable._check){
          this.fnInitTableValues();
          this.formService_tools.fnCheckInitTable(this.textInput_field.id)
        }
      })
    });
    this.subscription_table = this.formService_tools._tableCheckboxes.subscribe(data => {
      data.forEach(products => {
        if (products.id == this.textInput_field.id) {
          this.tableData.forEach(row => {
            if (products.deleteColumns) {
              products.deleteColumns.forEach(column => {
                delete row[column];
              })
            }
            this.fnSelectCheckGroup(products.reference, row[products.reference], false);
          });
          let index = 0;
          products.checked.forEach(select => {

            let idRow = this.fnSelectCheckGroup(products.reference, select, true);

            this.tableData.forEach(row => {
              if (row.idTableRowId == idRow) {
                if (products.addValues) {
                  if (Object.keys(products.addValues[index])) {
                    Object.keys(products.addValues[index]).forEach(column => {
                      row[column] = products.addValues[index][column];
                    });
                  }
                }
              }
            });
            this.anyArray_columns.forEach(headerColumn => {

              if (headerColumn.type != 'static' && headerColumn.type) {
                this.tableData.forEach(row => {
                  this.fnTableInputValueChange({
                    id: headerColumn.name,
                    value: row[headerColumn.name],
                    row: row.idTableRowId
                  });
                });

              }
            });
            index++;
          })
          this.formService_tools.fnMarkCheckbox(products.id);
        }
      });

    });
    this.bln_hideCheckHeader = this.textInput_field.disbleHeaderCheck;
    if (this.textInput_field._selectLimit) {
      this.bln_hideCheckHeader = true;
    }
    if (this.any_filters.filters) {
      this.filters = this.any_filters.filters;
    }
    if (this.textInput_field._pagination) {
      if (this.textInput_field._pagination._next) {
        this.str_next = this.textInput_field._pagination._next;
      }
      if (this.textInput_field._pagination._previous) {
        this.str_previous = this.textInput_field._pagination._previous;
      }
      if (this.textInput_field._pagination._itemsPerPage) {
        this.num_items = this.textInput_field._pagination._itemsPerPage;
      }
    }
    this.fnSubscribeToTableData();
    this.fnSetColumsSize();

  }

  ngOnDestroy() {
    if (this.subscription_table) {
      this.subscription_table.unsubscribe();
    }
    if(this.subscription_initTable){
      this.subscription_initTable.unsubscribe();
    }
  }

  str_next: string = "Next";
  str_previous: string = "Previous";
  num_items: number = 5;
  fnInitTableValues(): void {
    //console.log(this.textInput_field._initTable)
    if (this.textInput_field._initTable) {
      //console.log(this.textInput_field._initTable)
      let column: string = this.textInput_field._initTable._column;
      //console.log(this.textInput_field._initTable._values)
      if (this.textInput_field._initTable._values) {
        //console.log("Buscando...")
        this.textInput_field._initTable._values.forEach(select => {
          //console.log(select)
          this.fnSelectCheckGroup(column, select, true)
        });
      }

      /*
      this.tableData.forEach(data=>{
        
        this.textInput_field._initTable._values.forEach(select=>{
          this.fnSelectCheckGroup(column, select, true)
        });
      });
      */
    }
  }

  fnSetColumsSize(): void {
    if (this.any_filters.layout) {
      let layout = this.any_filters.layout;
      this.str_colXL = layout.xl ? this.str_colXL + layout.xl : this.str_colXL + 12
      this.str_colLG = layout.lg ? this.str_colLG + layout.lg : this.str_colLG + 12
      this.str_colMD = layout.md ? this.str_colMD + layout.md : this.str_colMD + 12
      this.str_colSM = layout.sm ? this.str_colSM + layout.sm : this.str_colSM + 12
      this.str_colXS = layout.xs ? this.str_colXS + layout.xs : this.str_colXS + 12
    }
  }

  fnSubscribeToTableData(): void {
    this._tableData.subscribe(res => {
      this.any_checked = {};
      let id = 0;
      this.tableData = res;
      this.tableData.forEach(data => {
        data.idTableRowId = id;
        this.any_checked[id] = false;
        id++;
      });
    })
  }

  fnSelectAllRows(event, onEmiter): void {

    this.selectedData = {};
    let bln_check: boolean = (event.target || event.srcElement).checked;
    Object.keys(this.any_checked).forEach(key => {
      this.any_checked[key] = bln_check;
      if (bln_check) {
        this.selectedData[key] = this.tableData[parseInt(key)];
      } else {
        delete this.selectedData[key];
      }
      if (onEmiter) {
        let any_data: any = {};
        any_data.data = this.tableData[parseInt(key)];
        any_data.selectedCheckBox = bln_check;
        any_data.id = this.textInput_field.id;
        if (this.textInput_field.countEquals) {
          let countColumns: any = {};
          this.textInput_field.countEquals.forEach(column => {
            let value = this.tableData[key][column];
            let countSelected: number = 0;
            let countUnselected: number = 0;
            this.tableData.forEach(data => {
              if (value == data[column]) {
                if (this.any_checked[data.idTableRowId]) {
                  countSelected++;
                } else {
                  countUnselected++;
                }

              }
            });
            countColumns[column] = { selected: countSelected, noselected: countUnselected };
          })
          any_data.countColumns = countColumns;
        }
        this.eventEmitter_checkbox.emit(any_data)
      }
    });

    this.fnSetFormControlValue()

  }

  fnChangeSelected(event, key): void {
    //console.log(key)
    //console.log(event)
    if (Object.keys(this.order).length > 0) {
      let deleteEvent: any = this.order[Object.keys(this.order)[0]];
      (deleteEvent.target || deleteEvent.srcElement).checked = false;
      let keyDelete: number = parseInt(Object.keys(this.order)[0].split('-')[1]);
      this.any_checked[keyDelete] = false;
      delete this.selectedData[keyDelete];
      delete this.order[Object.keys(this.order)[0]];
      delete this.selectedData[key];
      this.order["event-" + key] = event;
      this.num_selected--;
    }

  }

  headerCheck: boolean;
  num_selected: number = 0;
  order: any = {};
  fnSelectRow(event, key, onEmiter: boolean): void {
    let bln_check: boolean = (event.target || event.srcElement).checked;
    if (bln_check) {
      if (this.textInput_field._selectLimit) {
        if (this.textInput_field._selectLimit > this.num_selected) {
          this.order["event-" + key] = event;

        } else {
          this.fnChangeSelected(event, key);
          //(event.target || event.srcElement).checked = false;
        }
        this.num_selected++;
      } else {
        this.num_selected++;
      }
    } else {
      delete this.order["event-" + key];
      this.num_selected--;
    }
    console.log(this.num_selected)
    console.log(this.order);

    let any_data: any = {};
    any_data.data = this.tableData[parseInt(key)];
    any_data.selectedCheckBox = bln_check;
    any_data.id = this.textInput_field.id;
    if (bln_check) {
      this.selectedData[key] = this.tableData[parseInt(key)];
    } else {
      delete this.selectedData[key];
    }
    this.any_checked[key] = bln_check;

    if (onEmiter) {
      this.formcontrol_controller.markAsTouched();
      if (this.textInput_field.countEquals) {
        let countColumns: any = {};
        this.textInput_field.countEquals.forEach(column => {
          let value = this.tableData[key][column];
          let countSelected: number = 0;
          let countUnselected: number = 0;
          this.tableData.forEach(data => {
            if (value == data[column]) {
              if (this.any_checked[data.idTableRowId]) {
                countSelected++;
              } else {
                countUnselected++;
              }

            }
          });
          countColumns[column] = { selected: countSelected, noselected: countUnselected };
        })
        any_data.countColumns = countColumns;
      }
      this.eventEmitter_checkbox.emit(any_data)
    }

    this.fnSetFormControlValue()
  }

  fnSetFormControlValue(): void {
    let aux = [];
    if (Object.keys(this.selectedData).length > 0) {
      Object.keys(this.selectedData).forEach(data => {
        aux.push(this.selectedData[data]);
      });
      this.formcontrol_controller.setValue(aux);
    } else {
      this.formcontrol_controller.setValue(null)
    }
  }

  public fnSelectCheckGroup(str_colum: string, str_value: string, bln_select: boolean): number {

    let colum_id: number;
    this.tableData.forEach(res => {
      if (res[str_colum] == str_value) {
        this.fnSelectRow({ target: { checked: bln_select } }, res.idTableRowId, false);
        colum_id = res.idTableRowId
      }
    });
    return colum_id;
  }

  public fnResetTable(): void {
    this.tableData.forEach(res => {
      this.fnSelectRow({ target: { checked: false } }, res.idTableRowId, false);
    })
  }

  rowLastEdit: number;
  fnTableInputValueChange(event): void {
    if (!this.inputsValue[event.row]) {
      this.inputsValue[event.row] = {};
    }
    this.rowLastEdit = event.row;
    this.inputsValue[event.row][event.id] = event.value;
    this.formcontrol_controller.updateValueAndValidity();
    this.fnOperations();
  }

  fnOperations(): void {
    this.formcontrol_controller.markAsTouched();
    this.anyArray_columns.forEach(data => {
      if (data.operation) {
        //console.log(this.inputsValue)
        this.tableData.forEach(row => {
          if (row.idTableRowId == this.rowLastEdit) {
            let operation: string = data.operation;
            Object.keys(this.inputsValue).forEach(id_row => {
              Object.keys(this.inputsValue[id_row]).forEach(column => {
                //console.log(this.inputsValue[this.rowLastEdit][column])
                operation = operation.split(column).join(this.inputsValue[this.rowLastEdit][column]);
              });
            });
            //console.log(operation)
            //eval(operation);
            try {
              //console.log(operation)
              let value = eval(operation);
              row[data.name] = value;
              this.formcontrol_controller.updateValueAndValidity();
            } catch (error) {
              //console.log(error)
            }

          }
        })
      }
    });
    
  }


}
