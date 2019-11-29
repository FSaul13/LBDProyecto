import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultasService } from 'app/system/services/consultas.service';
import { AnimalService } from 'app/system/services/animal.service';

@Component({
  selector: 'app-consulta-enfermedad-animal',
  templateUrl: './consulta-enfermedad-animal.component.html',
  styleUrls: ['./consulta-enfermedad-animal.component.css']
})
export class ConsultaEnfermedadAnimalComponent implements OnInit {

  obs_Consulta: Observable<any[]>;
  obs_Animal: Observable<any[]>;
  num_idAnimal: number = 0;
  constructor(
    private consultaApi_service: ConsultasService,
    private animalApi_service: AnimalService
  ) {
    this.obs_Animal = this.animalApi_service._AnimalArray_recoveryAnimal;
    console.log(this.obs_Animal)
    this.obs_Consulta = this.consultaApi_service._ConsultaArray_recoveryConsulta;
    console.log(this.obs_Consulta)
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
    this.consultaApi_service.fnEnfermedadesSegunAnimal(this.num_idAnimal)
      .then(() => {
      })
      .catch(() => {
      })
  }
}
