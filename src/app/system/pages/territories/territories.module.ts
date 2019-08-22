import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerritoriesComponent } from './territories/territories.component';
import { TerritoriesControlComponent } from './territories-control/territories-control.component';
import { TerritoriesNewComponent } from './territories-new/territories-new.component';
import { TerritoriesEditComponent } from './territories-edit/territories-edit.component';
import { RouterModule } from '@angular/router';
import { TerritoresRouting } from './territories.routing';
import { TerritoriesService } from '../../services/territories.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StatesService } from '../../services/states.service';
import { CountriesService } from '../../services/countries.service';
import { TableModule } from '../../components/table/table.module';


@NgModule({
  declarations: [TerritoriesComponent, TerritoriesControlComponent, TerritoriesNewComponent, TerritoriesEditComponent],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild(TerritoresRouting),
    ReactiveFormsModule
  ],
  providers: [
    TerritoriesService,
    StatesService,
    CountriesService
  ]
})
export class TerritoriesModule { }
