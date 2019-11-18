import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormInput } from '../../models-form/form-input.model';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {

  @Input() formControl_control:FormControl;
  @Input() formGroup_form:FormGroup;
  @Input() settings:FormInput;
  @Input() str_labelType:string;

  @Input() items:any[] = []

  constructor() { }

  ngOnInit() {
  }

  fnrefreshControl(event){
    if(this.items.length==0){
      this.formControl_control.setValue(null);
    }else{
      this.formControl_control.setValue(this.items);
    }
  }

}
