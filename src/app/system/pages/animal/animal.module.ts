import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalComponent } from './animal/animal.component';
import { AnimalControlComponent } from './animal-control/animal-control.component';
import { AnimalEditComponent } from './animal-edit/animal-edit.component';
import { AnimalNewComponent } from './animal-new/animal-new.component';
import { FormModule } from '../../components/form/form.module';
import { RouterModule } from '@angular/router';
import { AnimalRouting } from './animal.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../../components/table/table.module';
import { ActionHeaderModule } from '../../components/action-header/action-header.module';

@NgModule({
  declarations: [AnimalComponent, AnimalControlComponent, AnimalEditComponent, AnimalNewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AnimalRouting),
    ReactiveFormsModule,
    TableModule,
    ActionHeaderModule,
    FormModule
  ]
})
export class AnimalModule { }
