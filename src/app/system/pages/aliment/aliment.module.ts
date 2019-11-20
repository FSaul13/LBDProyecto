import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlimentComponent } from './aliment/aliment.component';
import { AlimentNewComponent } from './aliment-new/aliment-new.component';
import { AlimentControlComponent } from './aliment-control/aliment-control.component';
import { AlimentEditComponent } from './aliment-edit/aliment-edit.component';
import { AlimentRouting } from './aliment.routing';
import { FormModule } from '../../components/form/form.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../components/table/table.module';
import { ActionHeaderModule } from '../../components/action-header/action-header.module';

@NgModule({
  declarations: [AlimentComponent, AlimentNewComponent, AlimentControlComponent, AlimentEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AlimentRouting),
    ReactiveFormsModule,
    TableModule,
    ActionHeaderModule,
    FormModule
  ]
})
export class AlimentModule { }
