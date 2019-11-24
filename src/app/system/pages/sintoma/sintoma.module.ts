import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SintomaComponent } from './sintoma/sintoma.component';
import { SintomaControlComponent } from './sintoma-control/sintoma-control.component';
import { SintomaEditComponent } from './sintoma-edit/sintoma-edit.component';
import { SintomaNewComponent } from './sintoma-new/sintoma-new.component';
import { SintomaRouting } from './sintoma.routing';
import { FormModule } from 'app/system/components/form/form.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'app/system/components/table/table.module';
import { ActionHeaderModule } from 'app/system/components/action-header/action-header.module';

@NgModule({
  declarations: [SintomaComponent, SintomaControlComponent, SintomaEditComponent, SintomaNewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SintomaRouting),
    ReactiveFormsModule,
    TableModule,
    ActionHeaderModule,
    FormModule
  ]
})
export class SintomaModule { }
