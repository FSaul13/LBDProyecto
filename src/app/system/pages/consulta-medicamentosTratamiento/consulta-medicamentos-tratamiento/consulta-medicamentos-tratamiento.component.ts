import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasService } from 'app/system/services/consultas.service';
import { TratamientoService } from 'app/system/services/tratamiento.service';

@Component({
  selector: 'app-consulta-medicamentos-tratamiento',
  templateUrl: './consulta-medicamentos-tratamiento.component.html',
  styleUrls: ['./consulta-medicamentos-tratamiento.component.css']
})
export class ConsultaMedicamentosTratamientoComponent implements OnInit {

  obs_Consulta: Observable<any[]>;
  obs_Tratamiento: Observable<any[]>;
  num_idTratamiento: number = 0;
  constructor(
    private consultaApi_service: ConsultasService,
    private TratamientoApi_service: TratamientoService
  ) {
    this.obs_Tratamiento = this.TratamientoApi_service._TratamientoArray_recoveryTratamiento;
    console.log(this.obs_Tratamiento)
    this.obs_Consulta = this.consultaApi_service._ConsultaArray_recoveryConsulta;
  }

  ngOnInit() {
    this.fnGetTratamiento()
  }

  ngOnDestroy() {
    this.consultaApi_service.fnResetConsultas()
  }

  fnGetTratamiento() {
    this.TratamientoApi_service.fnGetTratamiento()
      .then(() => { })
      .catch(() => { })
  }
  fnOnChangeTratamiento(): void {
    this.consultaApi_service.fnMedicamentosPorTratamiento(this.num_idTratamiento)
      .then(() => {
      })
      .catch(() => {
      })
  }


}
