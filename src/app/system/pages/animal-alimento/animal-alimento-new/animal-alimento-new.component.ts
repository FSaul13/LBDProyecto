import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { AnimalAlimentoService } from 'app/system/services/animal-alimento.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlimentService } from 'app/system/services/aliment.service';
import { AnimalService } from 'app/system/services/animal.service';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';

@Component({
  selector: 'app-Animal-Alimento-new',
  templateUrl: './Animal-Alimento-new.component.html',
  styleUrls: ['./Animal-Alimento-new.component.css']
})
export class AnimalAlimentoNewComponent implements OnInit {

  formgroup_newAnimal_Alimento: FormGroup;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  forSettings_config: FormSettings = {
    title: {
      title: 'Nuevo Animal_Alimento'
    } as FormTitle,
    fields: {
      _idAnimal: {
        id: 'AnimalSelect',
        label: 'Animal',
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
      sendText: "Enviar"

    } as FormButton,
    labelType: 'append',
    resetOnSuccess: true,
    _translate: true,
  } as FormSettings;


  constructor(
    private Animal_AlimentoService_apis: AnimalAlimentoService,
    private router: Router,
    private toastr: ToastrService,
    private alimentoService_api: AlimentService,
    private AnimalService_api: AnimalService
  ) { }

  ngOnInit() {
    this.fnInitForm();
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



  fnInitForm() {
    this.formgroup_newAnimal_Alimento = new FormGroup({
      _idAnimal: new FormControl(null, Validators.required),
      _alimentos: new FormControl(null, Validators.required),
    });
  }

  fnOnSend(event) {
    console.log(event);
    let newAnimal_Alimento = event.data;
    this.Animal_AlimentoService_apis.fnPostNewAnimal_Alimento(newAnimal_Alimento)
      .then((res) => {
        this.toastr.success(res);
        event.fnSuccess();

      })
      .catch((rej) => {
      });

  }

}
