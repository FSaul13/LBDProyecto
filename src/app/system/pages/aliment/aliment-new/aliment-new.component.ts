import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { AlimentService } from 'app/system/services/aliment.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimalService } from 'app/system/services/animal.service';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';

@Component({
  selector: 'app-aliment-new',
  templateUrl: './aliment-new.component.html',
  styleUrls: ['./aliment-new.component.css']
})
export class AlimentNewComponent implements OnInit {


  formgroup_newAliment: FormGroup;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  forSettings_config: FormSettings = {
    title: {
      title: 'Nuevo Alimento'
    } as FormTitle,
    fields: {
      _nombre:
        {
          label: 'Nombre',
          trim: true,
          type: 'text'
        } as FormInput,
      _presentacion: {
        label: 'Caracteristicas',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _indicaciones_uso: {
        label: 'Indicaciones',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _contenido_alimenticio: {
        label: 'Indicaciones',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _imagen_muestra: {
        label: 'Nombre',
        trim: true,
        type: 'text'
      } as FormInput,
      _precio: {
        label: 'Precio',
        type: 'number'
      } as FormInput,
      _imagen_alimento: {
        label: 'Imagen Alimento',
        trim: true,
        type: 'text'
      } as FormInput,
      _animal: {
        id: "animal",
        type: "table",
        label: 'Animal',
        options: this.animalService_api._AnimalArray_recoveryAnimal,
        tableColumns: [{ title: 'Nombre', name: 'nombre' }],
        tableFilters: {
          filters: [
            { type: "text", label: "Nombre", filterColum: "nombre" } as FormTableFilters,
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
    private AlimentService_apis: AlimentService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private animalService_api: AnimalService
  ) { }

  ngOnInit() {
    this.fnInitForm();
    this.fnGetAnimal()
  }
  fnGetAnimal() {
    this.animalService_api.fnGetAnimal()
      .then(() => { })
      .catch(() => { })
  }

  fnInitForm() {
    this.formgroup_newAliment = new FormGroup({
      _nombre: new FormControl(null),
      _presentacion: new FormControl(null),
      _indicaciones_uso: new FormControl(null),
      _contenido_alimenticio: new FormControl(null),
      _precio: new FormControl(null),
      _imagen_alimento: new FormControl(null),
      _animal: new FormControl(null)
    });
  }

  fnOnSend(event) {
    console.log(event);
    let str1 = new String();

    event.data._animal.forEach(element => {
      console.log(element.id_animal);
      str1 += element.id_animal;
      str1 += ','
    });
    let str2 = str1.substring(0, str1.length - 1)

    console.log(str2)
    console.log("llego");
    let newAliment = {
      _presentacion: event.data._presentacion,
      _indicaciones_uso: event.data._indicaciones_uso,
      _contenido_alimenticio: event.data._contenido_alimenticio,
      _precio: event.data._precio,
      _imagen_alimento: event.data._imagen_alimento,
      _nombre: event.data._nombre,
      _animal: str2

    }

    this.AlimentService_apis.fnPostNewAliment(newAliment)

      .then((res) => {
        this.toastr.success(res);
        event.fnSuccess();

      })
      .catch((rej) => {
        this.toastr.error(rej);
        event.fnError()
      });

  }
}
