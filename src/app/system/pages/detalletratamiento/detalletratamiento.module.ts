import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalletratamientoComponent } from './detalletratamiento/detalletratamiento.component';
import { DetalletratamientoNewComponent } from './detalletratamiento-new/detalletratamiento-new.component';
import { DetalletratamientoControlComponent } from './detalletratamiento-control/detalletratamiento-control.component';
import { DetalletratamientoEditComponent } from './detalletratamiento-edit/detalletratamiento-edit.component';

@NgModule({
  declarations: [DetalletratamientoComponent, DetalletratamientoNewComponent, DetalletratamientoControlComponent, DetalletratamientoEditComponent],
  imports: [
    CommonModule
  ]
})
export class DetalletratamientoModule { }
