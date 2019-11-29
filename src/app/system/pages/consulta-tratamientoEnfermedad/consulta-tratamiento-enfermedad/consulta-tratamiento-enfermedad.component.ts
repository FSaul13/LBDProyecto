import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasService } from 'app/system/services/consultas.service';
import { EnfermedadService } from 'app/system/services/enfermedad.service';

@Component({
  selector: 'app-consulta-tratamiento-enfermedad',
  templateUrl: './consulta-tratamiento-enfermedad.component.html',
  styleUrls: ['./consulta-tratamiento-enfermedad.component.css']
})
export class ConsultaTratamientoEnfermedadComponent implements OnInit {


  obs_Consulta: Observable<any[]>;
  obs_Enfermedad: Observable<any[]>;
  num_idEnfermedad: number = 0;
  constructor(
    private consultaApi_service: ConsultasService,
    private enfermedadApi_service: EnfermedadService
  ) {
    this.obs_Enfermedad = this.enfermedadApi_service._EnfermedadArray_recoveryEnfermedad;
    console.log(this.obs_Enfermedad)
    this.obs_Consulta = this.consultaApi_service._ConsultaArray_recoveryConsulta;
  }

  ngOnInit() {
    this.fnGetAnimal()
  }

  fnGetAnimal() {
    this.enfermedadApi_service.fnGetEnfermedad()
      .then(() => { })
      .catch(() => { })
  }
  ngOnDestroy() {
    this.consultaApi_service.fnResetConsultas()
  }
  fnOnChangeEnfermedad(): void {
    this.consultaApi_service.fnTratamientosPorEnfermedad(this.num_idEnfermedad)
      .then(() => {
      })
      .catch(() => {
      })
  }

}
