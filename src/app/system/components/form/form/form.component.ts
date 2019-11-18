import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewChildren, ViewContainerRef, QueryList } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { FormSettings } from '../models-form/form-settings.model';
import { FormColumns } from '../models-form/form-columns.model';
import { FormButton } from '../models-form/form-button.model';
import { TableInputComponent } from '../controls/table-input/table-input.component';
import { TranslateService } from '@ngx-translate/core';
import { FormGroupModel } from '../models-form/form-group.model';
import { FormGroupFieldModel } from '../models-form/formGroupField.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChildren(TableInputComponent) tableForm: ElementRef;

  @Input() formGroup_form: FormGroup;
  @Input() any_settings: FormSettings;
  @Output() eventEmmiter_onSendData: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmmiter_selectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmmiter_checkboxChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmmiter_keyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() eventEmmiter_file: EventEmitter<any> = new EventEmitter<any>();

  str_formTitle: string = "";
  str_titleAlign: string = "left";

  str_spinnerIcon: string = 'fas fa-spinner fa-spin';
  str_errorIcon: String = 'fas fa-times-circle';
  str_successIcon: String = 'fas fa-check-circle';
  str_save: string = 'Guardar';
  str_load: string = 'Guardando';
  str_error: string = 'Error';
  str_success: string = 'Guardado';

  str_saveButton: string = this.str_save;

  str_XScolumn: string = "col-xs-";
  str_SMcolumn: string = "col-sm-";
  str_MDcolumn: string = "col-md-";
  str_LGcolumn: string = "col-lg-";
  str_XLcolumn: string = "col-xl-";


  num_XScol: number = 12;
  num_SMcol: number = 12;
  num_MDcol: number = 12;
  num_LGcol: number = 12;
  num_XLcol: number = 12;


  arrayStr_controls: string[];
  fields: any = {};

  bln_saving: boolean = false;

  bln_forceValid: boolean;

  str_labelType: string;

  bln_translate: boolean;

  bln_disabledControls:boolean = false;

  icon_button:string;

  constructor(
  ) {
    
  }

  bln_hasGroups:boolean;

  ngOnInit() {
    this.bln_translate = this.any_settings._translate;
    this.fnLoadSettings();
    if(this.any_settings._groups){
      //this.any_settings._groups
      this.bln_hasGroups = true;
    }else{
      let formGroupFields_default:FormGroupFieldModel[] = [];
      Object.keys(this.formGroup_form.controls).forEach(data=>{
        formGroupFields_default.push({
          _control: data
        } as FormGroupFieldModel);
      });
      this.any_settings._groups = [{
        _controls: formGroupFields_default
      } as FormGroupModel];
    }
    //this.arrayStr_controls = Object.keys(this.formGroup_form.controls);

    if (this.any_settings.columns) {
      let columns: FormColumns = this.any_settings.columns
      if (columns.xs) {
        this.str_XScolumn = this.str_XScolumn + columns.xs;
      } else {
        this.str_XScolumn = this.str_XScolumn + 12;
      }
      if (columns.sm) {
        this.str_SMcolumn = this.str_SMcolumn + columns.sm;
      } else {
        this.str_SMcolumn = this.str_SMcolumn + 12;
      }
      if (columns.md) {
        this.str_MDcolumn = this.str_MDcolumn + columns.md;
      } else {
        this.str_MDcolumn = this.str_MDcolumn + 12;
      }
      if (columns.lg) {
        this.str_LGcolumn = this.str_LGcolumn + columns.lg;
      } else {
        this.str_LGcolumn = this.str_LGcolumn + 12;
      }
      if (columns.xl) {
        this.str_XLcolumn = this.str_XLcolumn + columns.md;
      } else {
        this.str_XLcolumn = this.str_XLcolumn + 12;
      }
    } else {
      this.str_XScolumn = this.str_XScolumn + 12;
      this.str_SMcolumn = this.str_SMcolumn + 12;
      this.str_MDcolumn = this.str_MDcolumn + 12;
      this.str_LGcolumn = this.str_LGcolumn + 12;
      this.str_XLcolumn = this.str_XLcolumn + 12;
    }
    if (this.any_settings.saveButton) {
      let saveButton: FormButton = this.any_settings.saveButton;
      if (saveButton.errorText) {
        this.str_error = saveButton.errorText;
      }
      if (saveButton.successText) {
        this.str_success = saveButton.successText;
      }
      if (saveButton.sendText) {
        this.str_save = saveButton.sendText;
      }
      this.bln_forceValid = saveButton.validToSend;
      if (saveButton.loadText) {
        this.str_load = saveButton.loadText;
      }

      this.str_saveButton = this.str_save;
      if (saveButton.errorIconClass) {
        this.str_errorIcon = saveButton.errorIconClass;
      }
      if (saveButton.successIconClass) {
        this.str_successIcon = saveButton.successIconClass;
      }
      if (saveButton.loadIconClass) {
        this.str_spinnerIcon = saveButton.loadIconClass;
      }
    }
    if (this.any_settings.labelType == "title") {
      this.str_labelType = this.any_settings.labelType;
    } else {
      this.str_labelType = "append";
    }
  }
  fnLoadSettings(): void {
    this.fields = this.any_settings.fields;
    if (this.any_settings.title) {
      this.str_formTitle = this.any_settings.title.title ? this.any_settings.title.title : "";
      this.str_titleAlign = this.any_settings.title.align ? this.any_settings.title.align : "left";
    }


  }

  fnSendFormData(): void {
    if (this.bln_saving) {
      return;
    }
    this.icon_button = this.str_spinnerIcon;
    let str_icon = '<i class="' + this.str_spinnerIcon + '"></i> ';
    console.log(str_icon)
    this.str_saveButton = this.str_load;
    this.bln_saving = true;

    let any_formData: any = this.formGroup_form.getRawValue()
    Object.keys(this.formGroup_form.getRawValue()).forEach(str_controlname => {

      if (this.any_settings.fields[str_controlname].trim) {

        if (any_formData[str_controlname]) {
          any_formData[str_controlname] = (any_formData[str_controlname] as string).trim();
        }

      }
    });
    let any_sendEvent:any = {};
    let num_group:number = 1;
    if(this.bln_hasGroups){
      this.any_settings._groups.forEach(data=>{
        let str_key:string =  (data._name)?(data._name):'group-'+num_group;
        any_sendEvent[str_key] = {};
        data._controls.forEach(control=>{
          let str_controlKey:string = (control._name)?(control._name):control._control;
          any_sendEvent[str_key][str_controlKey] = any_formData[control._control];
        });
        num_group++;
      });
      
    }else{
      any_sendEvent = any_formData;
    }
    this.bln_disabledControls = true;
    this.formGroup_form.disable();
    let event = {
      data: any_sendEvent,
      fnError: () => {
        this.bln_saving = false;
        this.icon_button = ''+this.str_errorIcon;
        let str_icon = '<i class="' + this.str_errorIcon + '"></i> ';
        this.str_saveButton = this.str_error;
        this.bln_disabledControls = false;
        this.formGroup_form.enable();
      },
      fnSuccess: () => {
        this.icon_button = '';
        this.bln_saving = false;
        this.bln_disabledControls = false;
        this.formGroup_form.enable();
        //let str_icon = '<i class="' + this.str_successIcon + '"></i> ';
        if (this.any_settings.saveButton) {
          let saveButton: FormButton = this.any_settings.saveButton;
          if (saveButton.sendText) {
            this.str_saveButton = saveButton.sendText;
          } else {
            this.str_saveButton = this.str_save;
          }
        } else {
          this.str_saveButton = this.str_save;
        }
        this.str_saveButton = this.str_saveButton;
        if (this.any_settings.resetOnSuccess) {
          this.formGroup_form.reset();
          this.formGroup_form.markAsUntouched();
          this.fnResetTables();
        }
      }
    };
    this.eventEmmiter_onSendData.emit(event);
  }

  fnOnChangeSelect(event) {
    this.eventEmmiter_selectChange.emit(event);
  }

  fnChangeCheckBox(event) {
    this.eventEmmiter_checkboxChange.emit(event);
    /*
    (this.tableForm as any).forEach(element => {
      console.log();
    });
    */
  }

  fnSelectFields(str_idTable: string, bln_check: boolean, options: any[], selectColumn: string, str_value: string): void {
    let table: TableInputComponent;
    (this.tableForm as any).forEach(element => {
      if (element.textInput_field.id == str_idTable) {
        table = element
      }
    });
    table.fnSelectCheckGroup(selectColumn, str_value, bln_check);
  }

  fnResetTables(): void {
    (this.tableForm as any).forEach(element => {
      element.fnResetTable();
    });
  }

  public fnInitTablesValue(): void {
    (this.tableForm as any).forEach(element => {
      element.fnInitTableValues();
    });
  }

  private fnEmmiterKeyUp(event): void {
    this.eventEmmiter_keyup.emit(event)
  }

  private fnEmmiterFile(event): void {
    this.eventEmmiter_file.emit(event)
  }

}
