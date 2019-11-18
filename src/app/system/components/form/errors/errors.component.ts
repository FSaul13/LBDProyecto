import { Component, OnInit, Input } from '@angular/core';
import { FormErrors } from '../models-form/form-errors.model';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  @Input() formErrors_errors:FormErrors;
  @Input() errors:any

  str_required:string = "Debes ingresar este campo";
  str_email:string = "Esta campo debe de ser un correo";

  constructor() { }

  ngOnInit() {
    if(!this.formErrors_errors){
      this.formErrors_errors = {} as FormErrors
    }
    if(this.formErrors_errors.email){
      this.str_email = this.formErrors_errors.email;
    }
    if(this.formErrors_errors.required){
      this.str_required = this.formErrors_errors.required;
    }
  }

}
