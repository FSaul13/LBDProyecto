import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Territory } from '../../../models/territory';
import { TerritoriesService } from '../../../services/territories.service';

import { StatesService } from '../../../services/states.service';
import { CountriesService } from '../../../services/countries.service';
import { Observable } from 'rxjs';
import { Country } from '../../../models/country';
import { State } from '../../../models/state';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-territories-new',
  templateUrl: './territories-new.component.html',
  styleUrls: ['./territories-new.component.css']
})
export class TerritoriesNewComponent implements OnInit {

  formroup_newTerritory: FormGroup;
  obs_countryArray:Observable<Country[]>
  obs_statesArray:Observable<State[]>


  constructor(private territoryService_apis: TerritoriesService,
    private stateService_apis: StatesService,
    private countryService: CountriesService,
    private feedback:ToastrService
  ) { }

  ngOnInit() {
    this.fnInitForm()
    this.fnGetCountry();
    this.obs_countryArray = this.countryService._countryArray_recoveryCountry;
    this.obs_statesArray = this.stateService_apis._stateArray_recoveryStates;
    this.stateService_apis._stateArray_recoveryStates.subscribe(res=>{
      if(res.length>0){
        this.formroup_newTerritory.get("_idEstado").setValue(res[0]._idEstado)
      }else{
        this.formroup_newTerritory.get("_idEstado").setValue(null)
      }
    })
  }

  fnGetState(num_idState:number) {
    this.stateService_apis.fnGetStates(num_idState)
    .then(() => { })
    .catch(error => {
      //console.log(error);
      this.feedback.error(error);
      });
  }

  fnGetCountry() {
    this.countryService.fnGetCountry()
      .then(() => {

      })
      .catch(error => {
        this.feedback.error(error);
       
      })
  }


  fnInitForm() {
    this.formroup_newTerritory = new FormGroup({
      _nombre: new FormControl(null, Validators.required),
      _descripcion: new FormControl(null, Validators.required),
      _idPais: new FormControl(null, Validators.required),
      _idEstado: new FormControl(null, Validators.required)
    });
  }

  fnOnChangeCountry():void{
    this.fnGetState(this.formroup_newTerritory.getRawValue()._idPais);
  }

  fnSubmitNewTerritory() {
    console.log(this.formroup_newTerritory.getRawValue())
    let territory_new: Territory = this.formroup_newTerritory.getRawValue()
    this.territoryService_apis.fnPostnewTerritory(territory_new)
      .then((message) => {
        this.feedback.success(message)
      })
      .catch((message) => {
        this.feedback.error(message)
      })
  }

}
