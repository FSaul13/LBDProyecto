import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnimalService } from 'app/system/services/animal.service';
import { AnimalAlimentoService } from 'app/system/services/animal-alimento.service';
import { AlimentService } from 'app/system/services/aliment.service';

@Component({
  selector: 'app-animal-alimento-edit',
  templateUrl: './animal-alimento-edit.component.html',
  styleUrls: ['./animal-alimento-edit.component.css']
})
export class AnimalAlimentoEditComponent implements OnInit {
  sub_Animal_AlimentoSubscription: Subscription;
  bln_loadForm: boolean = true;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  FormGroupEditAnimal_Alimento: FormGroup;

  forSettings_config: FormSettings = {
    title: {
      title: 'Editar Animal_Alimento'
    } as FormTitle,
    fields: {
      _idAnimal: {
        id: 'AnimalSelect',
        label: 'Animal_Alimento',
        type: 'select',
        key: '_idSite',
        value: '_nombre',
        options: this.AnimalService_api._AnimalArray_recoveryAnimal,
      } as FormInput,
      _alimentos: {
        id: "alimentos",
        type: "table",
        label: 'Alimentos',
        options: this.alimentoService_api._AlimentArray_recoveryAliment,
        tableColumns: [{ title: 'Nombre', name: '_nombre' }, { title: 'Presentacion', name: '_presentacion' }],
        tableFilters: {
          filters: [
            { type: "text", label: "Nombre", filterColum: "_nombre" } as FormTableFilters,
            { type: "text", label: "Presentacion", filterColum: "_presentacion" } as FormTableFilters,
          ] as FormTableFilters[]
        } as FormTableFiltersSettings,
        _pagination: {
          _next: "Siguiente",
          _previous: "Anterior",
          _itemsPerPage: 5
        } as FormTablePagination,
        disbleHeaderCheck: true,
      } as FormInput,



    },
    columns: {
      xl: 12,
      lg: 12,
      md: 12,
      sm: 12
    } as FormColumns,
    saveButton: {
      validToSend: true,
      loadIconClass: '',
    } as FormButton,
    labelType: 'append',
    resetOnSuccess: true,
    _translate: true,
  } as FormSettings;

  constructor(
    private route: ActivatedRoute,
    private Animal_Alimento_Service_apis: AnimalAlimentoService,
    private feedback: ToastrService,
    private router: Router,
    private alimentoService_api: AlimentService,
    private AnimalService_api: AnimalService
  ) { }

  ngOnInit() {
    this.fnInitformGroup();
    this.fnSubscribetoAnimal_Alimento();
    this.route.params.subscribe(params => {
      this.fnGetProductCode(params.idAnimalAlimento);
    });
  }


  ngOnDestroy() {
    if (this.sub_Animal_AlimentoSubscription) {
      this.sub_Animal_AlimentoSubscription.unsubscribe();
    }
    this.Animal_Alimento_Service_apis.fnResetAnimal_Alimento();
  }

  fnGetAnimal() {
    this.AnimalService_api.fnGetAnimal()
      .then(() => {

      })
      .catch(() => { })
  }
  fnGetAlimentos() {
    this.alimentoService_api.fnGetAliment()
      .then(() => {
      })
      .catch(() => { })
  }


  fnSubscribetoAnimal_Alimento(): void {

    this.sub_Animal_AlimentoSubscription = this.Animal_Alimento_Service_apis._Animal_Alimento_recoveryproductCode.subscribe(res => {
      if (res._idAnimal_Alimento) {

        /*const data = [];
        res..forEach(val => {
          data.push(val._id_alimento);
        })

        this.forSettings_config.fields._alimentos._initTable = {
          _column: '_id_alimento',
          _values: data
        };*/
        this.FormGroupEditAnimal_Alimento.setValue({
          _id_Animal: res._id_Animal,
          _alimentos: []


        });
      }
      else {
        this.FormGroupEditAnimal_Alimento.markAsUntouched();
        this.FormGroupEditAnimal_Alimento.reset();
      }
    });
  }



  fnInitformGroup() {
    this.FormGroupEditAnimal_Alimento = new FormGroup({
      _id_Animal: new FormControl(null, Validators.required),
      _alimentos: new FormControl(null, Validators.required),

    })
  }

  fnGetProductCode(idAnimal_Alimento: number) {
    this.bln_loadForm = true;
    this.Animal_Alimento_Service_apis.fnGetAnimal_AlimentoById(idAnimal_Alimento)
      .then(() => {
        this.bln_loadForm = false;
      })
      .catch(error => {
        this.bln_loadForm = false;
        this.feedback.error(error)
      })
  }


  fnEditData(event) {
    console.log(event)
    let editAnimal_Alimento = event.data;
    this.Animal_Alimento_Service_apis.fnEditAnimal_Alimento(editAnimal_Alimento)
      .then((res) => {
        this.feedback.success(res);
        event.fnSuccess();
        this.router.navigate(["system/admin/animal-alimento/control"])
      })
      .catch((rej) => {
        this.feedback.error(rej);
        event.fnError();
      })
  }

}
