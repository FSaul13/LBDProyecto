import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalAlimentoNewComponent } from './animal-alimento-new/animal-alimento-new.component';
import { AnimalAlimentoControlComponent } from './animal-alimento-control/animal-alimento-control.component';
import { AnimalAlimentoEditComponent } from './animal-alimento-edit/animal-alimento-edit.component';
import { AnimalAlimentoComponent } from './animal-alimento/animal-alimento.component';
import { AnimalAlimentoRouting } from './animal-alimento.routing';
import { FormModule } from 'app/system/components/form/form.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'app/system/components/table/table.module';
import { ActionHeaderModule } from 'app/system/components/action-header/action-header.module';

@NgModule({
  declarations: [AnimalAlimentoNewComponent, AnimalAlimentoControlComponent, AnimalAlimentoEditComponent, AnimalAlimentoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AnimalAlimentoRouting),
    ReactiveFormsModule,
    TableModule,
    ActionHeaderModule,
    FormModule
  ]
})
export class AnimalAlimentoModule { }
