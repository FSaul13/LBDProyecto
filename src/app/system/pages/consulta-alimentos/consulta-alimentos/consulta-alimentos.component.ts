import { Component, OnInit } from '@angular/core';
import { EnfermedadService } from 'app/system/services/enfermedad.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consulta-alimentos',
  templateUrl: './consulta-alimentos.component.html',
  styleUrls: ['./consulta-alimentos.component.css']
})
export class ConsultaAlimentosComponent implements OnInit {
  obs_Enfermedad: Observable<any[]>

  constructor(
    private enfermedadApi_service: EnfermedadService
  ) {

    this.obs_Enfermedad = this.enfermedadApi_service._EnfermedadArray_recoveryEnfermedad;
  }

  ngOnInit() {
    this.fnGetEnfermedad();
  }

  fnGetEnfermedad(): void {

    this.enfermedadApi_service.fnGetEnfermedad()
      .then(() => {

      })
      .catch(error => {

      })

  }
}
