import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TableSearchPipe } from './pipes/table-search.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableComponent,TableSearchPipe],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
