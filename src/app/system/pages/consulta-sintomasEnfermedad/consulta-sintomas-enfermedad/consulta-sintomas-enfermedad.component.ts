import { Component, OnInit } from '@angular/core';
import { EnfermedadService } from 'app/system/services/enfermedad.service';
import { ConsultasService } from 'app/system/services/consultas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consulta-sintomas-enfermedad',
  templateUrl: './consulta-sintomas-enfermedad.component.html',
  styleUrls: ['./consulta-sintomas-enfermedad.component.css']
})
export class ConsultaSintomasEnfermedadComponent implements OnInit {

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
  ngOnDestroy() {
    this.consultaApi_service.fnResetConsultas()
  }

  ngOnInit() {
    this.fnGetAnimal()
  }

  fnGetAnimal() {
    this.enfermedadApi_service.fnGetEnfermedad()
      .then(() => { })
      .catch(() => { })
  }
  fnOnChangeEnfermedad(): void {
    this.consultaApi_service.fnSintomasPorEnfermedad(this.num_idEnfermedad)
      .then(() => {
      })
      .catch(() => {
      })
  }



}
