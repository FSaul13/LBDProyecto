import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './controls/text-input/text-input.component';
import { ErrorsComponent } from './errors/errors.component';
import { SelectInputComponent } from './controls/select-input/select-input.component';
import { TextareaInputComponent } from './controls/textarea-input/textarea-input.component';

@NgModule({
  declarations: [FormComponent, TextInputComponent, ErrorsComponent, SelectInputComponent, TextareaInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    FormComponent
  ]
})
export class FormModule { }
