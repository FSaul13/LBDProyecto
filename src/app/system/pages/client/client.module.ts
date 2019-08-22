import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientControlComponent } from './client-control/client-control.component';
import { ClientComponent } from './client/client.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { RouterModule } from '@angular/router';
import { ClientRouting } from './client.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { TableModule } from '../../components/table/table.module';

@NgModule({
  declarations: [ClientControlComponent, ClientComponent, ClientNewComponent, ClientEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientRouting),
    ReactiveFormsModule,
    TableModule
  ],
  providers: [
   ClientService
  ]
})
export class ClientModule { }
