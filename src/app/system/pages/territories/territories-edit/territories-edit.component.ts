import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Territory } from '../../../models/territory';
import { TerritoriesService } from '../../../services/territories.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatesService } from '../../../services/states.service';
import { CountriesService } from '../../../services/countries.service';
import { Observable } from 'rxjs';
import { Country } from '../../../models/country';
import { State } from '../../../models/state';

@Component({
  selector: 'app-territories-edit',
  templateUrl: './territories-edit.component.html',
  styleUrls: ['./territories-edit.component.css']
})
export class TerritoriesEditComponent implements OnInit {
  formgroup_editTerritory: FormGroup;
  obs_countryArray: Observable<Country[]>
  obs_statesArray: Observable<State[]>


  bln_initChange:boolean = true;

  constructor(
    private territoryService_apis: TerritoriesService,
    private route: ActivatedRoute,
    private feedback: ToastrService,
    private stateService_apis: StatesService,
    private countryService: CountriesService,
  ) { }

  ngOnInit() {
    this.fnInitForm()
    this.obs_countryArray = this.countryService._countryArray_recoveryCountry;
    this.obs_statesArray = this.stateService_apis._stateArray_recoveryStates;
    
    this.stateService_apis._stateArray_recoveryStates.subscribe(res=>{
      

      if(res.length>0){
        if(this.bln_initChange){
          this.bln_initChange = false;
          return;
        }
        this.formgroup_editTerritory.get("_idEstado").setValue(res[0]._idEstado)
      }else{
        this.formgroup_editTerritory.get("_idEstado").setValue(null)
      }
    })
    
    this.fnSubscribeToTerritory();
    this.route.params.subscribe(params => {
      this.fnGetTerritory(params.id_territorie)
    })
  }

  fnSubscribeToTerritory(): void {
    this.territoryService_apis._territory_recoverUserType.subscribe(res => {
      if (res._idTerritorio) {
        console.log(res)
        this.formgroup_editTerritory.setValue({
          _idTerritorio: res._idTerritorio,
          _nombre: res._nombre,
          _descripcion: res._descripcion,
          _idPais: res._estado._idPais,
          _idEstado: res._estado._idEstado,
        })
        let idEstado = res._estado._idPais;

        this.fnGetCountry();

        this.fnGetState(idEstado)



      } else {
        this.formgroup_editTerritory.markAsUntouched()
        this.formgroup_editTerritory.reset()
      }
    });
  }

  fnInitForm() {
    this.formgroup_editTerritory = new FormGroup({
      _idTerritorio: new FormControl(null, Validators.required),
      _nombre: new FormControl(null, Validators.required),
      _descripcion: new FormControl(null, Validators.required),
      _idPais: new FormControl(null, Validators.required),
      _idEstado: new FormControl(null, Validators.required)
    });
  }

  fnSubmitEditTerritory(): void {
    let territory_Edit: Territory = this.formgroup_editTerritory.getRawValue();
    console.log(territory_Edit)
    this.territoryService_apis.fnEditTerritory(territory_Edit)
      .then((message) => {
        this.feedback.success(message);
      })
      .catch((message) => {
        this.feedback.error(message);

      });


  }

  fnGetTerritory(num_idTrritory: number): void {
    this.territoryService_apis.fnGetTerritoryById(num_idTrritory)
      .then(() => { })
      .catch(() => { });

  }
  fnGetState(num_idState: number) {
    console.log(num_idState)
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
  fnOnChangeCountry(): void {
    this.fnGetState(this.formgroup_editTerritory.getRawValue()._idPais);
  }


}
