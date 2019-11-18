import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormInput } from '../../models-form/form-input.model';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.css']
})
export class TextareaInputComponent implements OnInit {

  @Input() formGroup_form: FormGroup;
  @Input() formControl_control: FormControl;
  @Input() textInput_field: FormInput;
  @Input() str_labelType: string;
  @Input() bln_translate: boolean;

  @Output() eventEmiter_keyUp: EventEmitter<any> = new EventEmitter<any>();

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

  fnOnKeyUp(event): void {
    Object.keys(this.formGroup_form.controls).forEach(str_key => {
      this.formGroup_form.controls[str_key].updateValueAndValidity();
    });
    let value = (event.target || event.srcElement).value;
    let emit_event: any = {
      id: this.textInput_field.id,
      type: this.textInput_field.type,
      value: value
    }
    this.eventEmiter_keyUp.emit(emit_event);
  }

}
