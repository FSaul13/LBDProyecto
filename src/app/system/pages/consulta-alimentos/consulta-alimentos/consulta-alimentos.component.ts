import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasService } from '../../../services/consultas.service';
import { AnimalService } from 'app/system/services/animal.service';

@Component({
  selector: 'app-consulta-alimentos',
  templateUrl: './consulta-alimentos.component.html',
  styleUrls: ['./consulta-alimentos.component.css']
})
export class ConsultaAlimentosComponent implements OnInit {
  obs_Consulta: Observable<any[]>;
  obs_Animal: Observable<any[]>;
  num_idAnimal: number = 0;
  show: boolean = false;
  constructor(
    private consultaApi_service: ConsultasService,
    private animalApi_service: AnimalService
  ) {
    this.obs_Animal = this.animalApi_service._AnimalArray_recoveryAnimal;
    console.log(this.obs_Animal)
    this.obs_Consulta = this.consultaApi_service._ConsultaArray_recoveryConsulta;
  }

  ngOnInit() {
    this.fnGetAnimal()
  }
  ngOnDestroy() {
    this.consultaApi_service.fnResetConsultas()
  }

  fnGetAnimal() {
    this.animalApi_service.fnGetAnimal()
      .then(() => { })
      .catch(() => { })
  }
  fnOnChangeAnimal(): void {
    this.consultaApi_service.fnAlimentosPorAnimal(this.num_idAnimal)
      .then(() => {
      })
      .catch(() => {
      })
  }

  //alimentosPorAnimal', //Ocupa un id de animal
}
