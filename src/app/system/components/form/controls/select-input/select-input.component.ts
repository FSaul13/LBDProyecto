import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormInput } from '../../models-form/form-input.model';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent implements OnInit {

  @Input() formGroup_form: FormGroup;
  @Input() formControl_control: FormControl;
  @Input() textInput_field: FormInput
  @Input() str_labelType: string;
  @Input() bln_translate: boolean;
  @Input() bln_disableSelect: boolean;

  @Output() eventEmmiter_change: EventEmitter<any> = new EventEmitter();

  str_label: string = "";
  str_placeholder: string = "";

  constructor() { }

  ngOnInit() {
    if (this.textInput_field.label) {
      this.str_label = this.textInput_field.label;
    }
    if (this.textInput_field.placeholder) {
      this.str_placeholder = this.textInput_field.placeholder;
    }
  }

  fnOnChange(event): void {
    Object.keys(this.formGroup_form.controls).forEach(str_key => {
      this.formGroup_form.controls[str_key].updateValueAndValidity();
    });
    this.eventEmmiter_change.emit({ value: (event.target || event.srcElement).value, id: this.textInput_field.id });
  }

}
