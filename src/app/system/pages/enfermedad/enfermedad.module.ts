import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnfermedadEditComponent } from './enfermedad-edit/enfermedad-edit.component';
import { EnfermedadControlComponent } from './enfermedad-control/enfermedad-control.component';
import { EnfermedadNewComponent } from './enfermedad-new/enfermedad-new.component';
import { EnfermedadComponent } from './enfermedad/enfermedad.component';
import { EnfermedadRouting } from './enfermedad.routing';
import { FormModule } from 'app/system/components/form/form.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'app/system/components/table/table.module';
import { ActionHeaderModule } from 'app/system/components/action-header/action-header.module';

@NgModule({
  declarations: [EnfermedadEditComponent, EnfermedadControlComponent, EnfermedadNewComponent, EnfermedadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EnfermedadRouting),
    ReactiveFormsModule,
    TableModule,
    ActionHeaderModule,
    FormModule
  ]
})
export class EnfermedadModule { }
