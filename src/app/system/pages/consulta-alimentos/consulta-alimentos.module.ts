import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaAlimentosComponent } from './consulta-alimentos/consulta-alimentos.component';
import { FormModule } from 'app/system/components/form/form.module';
import { TableModule } from 'app/system/components/table/table.module';
import { ActionHeaderModule } from 'app/system/components/action-header/action-header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ConsultaAlimentosComponent],
  imports: [
    CommonModule,
    TableModule,
    FormModule,
    ActionHeaderModule,
    NgbModule,
  ]
})
export class ConsultaAlimentosModule { }
