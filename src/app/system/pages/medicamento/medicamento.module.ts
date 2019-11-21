import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentoComponent } from './medicamento/medicamento.component';
import { MedicamentoControlComponent } from './medicamento-control/medicamento-control.component';
import { MedicamentoEditComponent } from './medicamento-edit/medicamento-edit.component';
import { MedicamentoNewComponent } from './medicamento-new/medicamento-new.component';
import { EnfermedadRouting } from '../enfermedad/enfermedad.routing';
import { FormModule } from 'app/system/components/form/form.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'app/system/components/table/table.module';
import { ActionHeaderModule } from 'app/system/components/action-header/action-header.module';
import { MedicamentoRouting } from './medicamento.routing';

@NgModule({
  declarations: [MedicamentoComponent, MedicamentoControlComponent, MedicamentoEditComponent, MedicamentoNewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MedicamentoRouting),
    ReactiveFormsModule,
    TableModule,
    ActionHeaderModule,
    FormModule
  ]
})
export class MedicamentoModule { }
