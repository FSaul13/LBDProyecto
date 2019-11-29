import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'app/system/services/consultas.service';

@Component({
  selector: 'app-consulta-enfermedad-sintoma',
  templateUrl: './consulta-enfermedad-sintoma.component.html',
  styleUrls: ['./consulta-enfermedad-sintoma.component.css']
})
export class ConsultaEnfermedadSintomaComponent implements OnInit {

  constructor(
    private consultaApi_service: ConsultasService
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.consultaApi_service.fnResetConsultas()
  }

}
