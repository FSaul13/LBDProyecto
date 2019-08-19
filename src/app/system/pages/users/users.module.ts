import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersControlComponent } from './users-control/users-control.component';
import { UsersNewComponent } from './users-new/users-new.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { RouterModule } from '@angular/router';
import { UsersRouting } from './users.routing';
import { UsersComponent } from './users/users.component';
import { TableModule } from '../../components/table/table.module';
import { FormModule } from '../../components/form/form.module';
import { ActionHeaderModule } from '../../components/action-header/action-header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UsersControlComponent, 
    UsersNewComponent, 
    UsersEditComponent, UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRouting),
    TableModule,
    FormModule,
    ActionHeaderModule,
    NgbModule,
  ]
})
export class UsersModule { }
