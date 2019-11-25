import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleTratamientoNewComponent } from './detalle-tratamiento-new/detalle-tratamiento-new.component';
import { DetalleTratamientoControlComponent } from './detalle-tratamiento-control/detalle-tratamiento-control.component';
import { DetalleTratamientoEditComponent } from './detalle-tratamiento-edit/detalle-tratamiento-edit.component';
import { DetalleTratamientoComponent } from './detalle-tratamiento/detalle-tratamiento.component';
import { FormModule } from 'app/system/components/form/form.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'app/system/components/table/table.module';
import { ActionHeaderModule } from 'app/system/components/action-header/action-header.module';
import { DetalleTratamientoRouting } from './detalle-tratamiento.routing';

@NgModule({
  declarations: [DetalleTratamientoNewComponent, DetalleTratamientoControlComponent,
    DetalleTratamientoEditComponent, DetalleTratamientoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DetalleTratamientoRouting),
    ReactiveFormsModule,
    TableModule,
    ActionHeaderModule,
    FormModule
  ]
})
export class DetalleTratamientoModule { }
