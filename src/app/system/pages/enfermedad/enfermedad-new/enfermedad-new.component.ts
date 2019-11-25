import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { EnfermedadService } from 'app/system/services/enfermedad.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimalService } from 'app/system/services/animal.service';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';

@Component({
  selector: 'app-enfermedad-new',
  templateUrl: './enfermedad-new.component.html',
  styleUrls: ['./enfermedad-new.component.css']
})
export class EnfermedadNewComponent implements OnInit {


  formgroup_newEnfermedad: FormGroup;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  forSettings_config: FormSettings = {
    title: {
      title: 'Nuevo Enfermedad'
    } as FormTitle,
    fields: {
      _nombre_comun:
        {
          label: 'Nombre',
          trim: true,
          type: 'text'
        } as FormInput,
      _grado_mortalidad: {
        label: 'Mortalidad',
        type: 'number'
      } as FormInput,
      _virus_causante: {
        label: 'Virus',
        trim: true,
        type: 'text'
      } as FormInput,
      _causas_infeccion: {
        label: 'Causas infeccion',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _animal: {
        id: "animal",
        type: "table",
        label: 'Animal',
        options: this.animalService_api._AnimalArray_recoveryAnimal,
        tableColumns: [{ title: 'Nombre', name: 'nombre' }],
        tableFilters: {
          filters: [
            { type: "text", label: "Nombre", filterColum: "_nombre" } as FormTableFilters,
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
    private EnfermedadService_apis: EnfermedadService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private animalService_api: AnimalService
  ) { }

  ngOnInit() {
    this.fnInitForm();
    this.fnGetAnimal();
  }

  fnGetAnimal() {
    this.animalService_api.fnGetAnimal()
      .then(() => { })
      .catch(() => { })
  }


  fnInitForm() {
    this.formgroup_newEnfermedad = new FormGroup({
      _nombre_comun: new FormControl(null, Validators.required),
      _grado_mortalidad: new FormControl(null, Validators.required),
      _virus_causante: new FormControl(null, Validators.required),
      _causas_infeccion: new FormControl(null, Validators.required),
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

    let newEnfermedad = {
      _nombre_comun: event.data._nombre_comun,
      _grado_mortalidad: event.data._grado_mortalidad,
      _virus_causante: event.data._virus_causante,
      _causas_infeccion: event.data._causas_infeccion,
      _animal: str2
    };
    
    this.EnfermedadService_apis.fnPostNewEnfermedad(newEnfermedad)
      .then((res) => {
        this.toastr.success(res);
        event.fnSuccess();

      })
      .catch((rej) => {
      });

  }

}
