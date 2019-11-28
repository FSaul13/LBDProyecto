import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasService } from '../../../services/consultas.service';

@Component({
  selector: 'app-consulta-alimentos',
  templateUrl: './consulta-alimentos.component.html',
  styleUrls: ['./consulta-alimentos.component.css']
})
export class ConsultaAlimentosComponent implements OnInit {
  obs_Consulta: Observable<any[]>

  constructor(
    private consultaApi_service: ConsultasService
  ) {

    this.obs_Consulta = this.consultaApi_service._ConsultaArray_recoveryConsulta;
  }

  ngOnInit() {
    this.fnGetConsulta();
  }

  fnGetConsulta(): void {
    ///No ocupa nada
    this.consultaApi_service.fnEnfermedadesPeligrosas()
      .then(() => {
        console.log(this.obs_Consulta);
      })
      .catch(error => {

      })

  }
}
