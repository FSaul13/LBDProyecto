import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { FormSettings } from '../models-form/form-settings.model';
import { FormColumns } from '../models-form/form-columns.model';
import { FormButton } from '../models-form/form-button.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() formGroup_form: FormGroup;
  @Input() any_settings: FormSettings;

  @Output() eventEmmiter_onSendData:EventEmitter<any> = new EventEmitter<any>();

  str_formTitle:string = "";
  str_titleAlign:string = "left";

  str_spinnerIcon:string = 'fas fa-spinner fa-spin';
  str_errorIcon:String = 'fas fa-times-circle';
  str_successIcon:String = 'fas fa-check-circle';
  str_save:string = 'Guardar';
  str_load:string = 'Guardando';
  str_error:string = 'Error';
  str_success:string = 'Guardado';

  str_saveButton:string = this.str_save;

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

  bln_saving:boolean = false;

  bln_forceValid:boolean;

  str_labelType:string;

  constructor() { }

  ngOnInit() {
    this.arrayStr_controls = Object.keys(this.formGroup_form.controls);
    this.fields = this.any_settings.fields;
    if(this.any_settings.title){
      this.str_formTitle = this.any_settings.title.title ? this.any_settings.title.title : "";
      this.str_titleAlign = this.any_settings.title.align ? this.any_settings.title.align : "left"; 
    }
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
    if(this.any_settings.saveButton){
      let saveButton:FormButton = this.any_settings.saveButton;
      if(saveButton.errorText){
        this.str_error = saveButton.errorText;
      }
      if(saveButton.successText){
        this.str_success = saveButton.successText;
      }
      if(saveButton.sendText){
        this.str_save = saveButton.sendText;
      }
      this.bln_forceValid = saveButton.validToSend;
      if(saveButton.loadText){
        this.str_load = saveButton.loadText;
      }
      this.str_saveButton = this.str_save;
      if(saveButton.errorIconClass){
        this.str_errorIcon = saveButton.errorIconClass;
      }
      if(saveButton.successIconClass){
        this.str_successIcon = saveButton.successIconClass;
      }
      if(saveButton.loadIconClass){
        this.str_spinnerIcon = saveButton.loadIconClass;
      }
    }
    if(this.any_settings.labelType=="title"){
      this.str_labelType = this.any_settings.labelType;
    }else{
      this.str_labelType = "append";
    }
  }

  fnSendFormData(): void {
    if(this.bln_saving){
      return;
    }
    let str_icon = '<i class="'+this.str_spinnerIcon+'"></i> ';
    this.str_saveButton = str_icon + " " + this.str_load;
    this.bln_saving = true;
    let event = {
      data: this.formGroup_form.getRawValue(),
      fnError: () => {
        this.bln_saving = false;
        let str_icon = '<i class="'+this.str_errorIcon+'"></i> ';
        this.str_saveButton = str_icon + this.str_error;
      },
      fnSuccess: () => {
        this.bln_saving = false;
        let str_icon = '<i class="'+this.str_successIcon+'"></i> ';
        this.str_saveButton = str_icon + this.str_success;
        if(this.any_settings.resetOnSuccess){
          this.formGroup_form.reset();
        }
      }
    };
    this.eventEmmiter_onSendData.emit(event);
  }

}
