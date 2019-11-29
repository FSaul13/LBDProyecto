import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasService } from 'app/system/services/consultas.service';

@Component({
  selector: 'app-consulta-enfermedad-peligrosas',
  templateUrl: './consulta-enfermedad-peligrosas.component.html',
  styleUrls: ['./consulta-enfermedad-peligrosas.component.css']
})
export class ConsultaEnfermedadPeligrosasComponent implements OnInit {
  obs_Consulta: Observable<any[]>

  constructor(
    private consultaApi_service: ConsultasService
  ) {

    this.obs_Consulta = this.consultaApi_service._ConsultaArray_recoveryConsulta;
  }

  ngOnInit() {
    this.fnGetConsulta();
  }
  ngOnDestroy() {
    this.consultaApi_service.fnResetConsultas()
  }

  fnGetConsulta(): void {
    ///No ocupa nada
    this.consultaApi_service.fnEnfermedadesPeligrosas()
      .then((res) => {
        var str: string = ''
        //console.log(res);
        for (var i = 0; i < res.length; i++) {
          if (str != res[i]._nombre_comun) {
            //Definir una enfermedad
            str = res[i]._nombre_comun;
            console.log(str + ' GM: ' + res[i]._grado_mortalidad);
          }
          console.log('S->' + res[i]._Sintoma);
        }
      })
      .catch(error => {

      })

  }


}
