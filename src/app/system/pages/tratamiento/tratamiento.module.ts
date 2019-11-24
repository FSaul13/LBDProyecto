import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TratamientoNewComponent } from './tratamiento-new/tratamiento-new.component';
import { TratamientoEditComponent } from './tratamiento-edit/tratamiento-edit.component';
import { TratamientoControlComponent } from './tratamiento-control/tratamiento-control.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { TratamientoRouting } from './tratamiento.routing';
import { FormModule } from 'app/system/components/form/form.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'app/system/components/table/table.module';
import { ActionHeaderModule } from 'app/system/components/action-header/action-header.module';

@NgModule({
  declarations: [TratamientoNewComponent, TratamientoEditComponent, TratamientoControlComponent, TratamientoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TratamientoRouting),
    ReactiveFormsModule,
    TableModule,
    ActionHeaderModule,
    FormModule
  ]
})
export class TratamientoModule { }
