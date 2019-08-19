import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTypesComponent } from './user-types/user-types.component';
import { UserTypesControlComponent } from './user-types-control/user-types-control.component';
import { UserTypesNewComponent } from './user-types-new/user-types-new.component';
import { UserTypesEditComponent } from './user-types-edit/user-types-edit.component';
import { RouterModule } from '@angular/router';
import { TableModule } from '../../components/table/table.module';
import { FormModule } from '../../components/form/form.module';
import { UsersTypesRouting } from './user-types.routing';
import { ActionHeaderModule } from '../../components/action-header/action-header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserTypesComponent, UserTypesControlComponent, UserTypesNewComponent, UserTypesEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UsersTypesRouting),
    TableModule,
    FormModule,
    ActionHeaderModule,
    NgbModule,
  ],
})
export class UserTypesModule { }
