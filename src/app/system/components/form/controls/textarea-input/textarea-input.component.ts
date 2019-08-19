import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormInput } from '../../models-form/form-input.model';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.css']
})
export class TextareaInputComponent implements OnInit {

  @Input() formGroup_form:FormGroup;
  @Input() formControl_control:FormControl;
  @Input() textInput_field:FormInput;
  @Input() str_labelType:string;

  str_label:string="";
  str_placeholder:string="";

  constructor() { }

  ngOnInit() {
    this.str_label = this.textInput_field.label;
    if(this.textInput_field.placeholder){
      this.str_placeholder = this.textInput_field.placeholder;
    }
  }

  fnOnKeyUp():void{
    Object.keys(this.formGroup_form.controls).forEach(str_key=>{
      this.formGroup_form.controls[str_key].updateValueAndValidity();
    });
  }

}
