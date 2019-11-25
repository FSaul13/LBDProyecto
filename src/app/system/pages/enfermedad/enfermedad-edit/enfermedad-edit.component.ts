import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { constructor } from 'q';
import { ActivatedRoute, Router } from '@angular/router';
import { EnfermedadService } from 'app/system/services/enfermedad.service';
import { ToastrService } from 'ngx-toastr';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';
import { AnimalService } from 'app/system/services/animal.service';

@Component({
  selector: 'app-enfermedad-edit',
  templateUrl: './enfermedad-edit.component.html',
  styleUrls: ['./enfermedad-edit.component.css']
})
export class EnfermedadEditComponent implements OnInit {


  sub_EnfermedadSubscription: Subscription;
  bln_loadForm: boolean = true;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  FormGroupEditEnfermedad: FormGroup;

  forSettings_config: FormSettings = {
    title: {
      title: 'Editar Enfermedad'
    } as FormTitle,
    fields: {
      _id_enfermedad: {
        hide: true
      } as FormInput,
      _nombre_comun:
        {
          label: 'Nombre',
          trim: true,
          type: 'text'
        } as FormInput,
      _grado_mortalidad: {
        label: 'Mortalidad',
        trim: true,
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
    } as FormButton,
    labelType: 'append',
    resetOnSuccess: true,
    _translate: true,
  } as FormSettings;

  constructor(
    private route: ActivatedRoute,
    private EnfermedadService_apis: EnfermedadService,
    private feedback: ToastrService,
    private router: Router,
    private animalService_api: AnimalService
  ) { }

  ngOnInit() {
    this.fnInitformGroup();
    this.fnGetAnimal();
    this.fnSubscribetoEnfermedad();
    this.route.params.subscribe(params => {
      this.fnGetProductCode(params.idEnfermedad);
    });
  }
  fnGetAnimal() {
    this.animalService_api.fnGetAnimal()
      .then(() => { })
      .catch(() => { })
  }



  ngOnDestroy() {
    if (this.sub_EnfermedadSubscription) {
      this.sub_EnfermedadSubscription.unsubscribe();
    }
    this.EnfermedadService_apis.fnResetEnfermedad();
  }


  fnSubscribetoEnfermedad(): void {

    this.sub_EnfermedadSubscription = this.EnfermedadService_apis._Enfermedad_recoveryproductCode.subscribe(res => {
      if (res._id_enfermedad) {
        this.FormGroupEditEnfermedad.setValue({
          _id_enfermedad: res._id_enfermedad,
          _nombre_comun: res._nombre_comun,
          _grado_mortalidad: res._grado_mortalidad,
          _virus_causante: res._virus_causante,
          _causas_infeccion: res._causas_infeccion,
          _animal: res._animal


        });
      }
      else {
        this.FormGroupEditEnfermedad.markAsUntouched();
        this.FormGroupEditEnfermedad.reset();
      }
    });
  }



  fnInitformGroup() {
    this.FormGroupEditEnfermedad = new FormGroup({
      _id_Enfermedad: new FormControl(null, Validators.required),
      _nombre_comun: new FormControl(null, Validators.required),
      _grado_mortalidad: new FormControl(null, Validators.required),
      _virus_causante: new FormControl(null, Validators.required),
      _causas_infeccion: new FormControl(null, Validators.required),
      _animal: new FormControl(null)

    });
  }

  fnGetProductCode(idEnfermedad: number) {
    this.bln_loadForm = true;
    this.EnfermedadService_apis.fnGetEnfermedadById(idEnfermedad)
      .then(() => {
        this.bln_loadForm = false;
      })
      .catch(error => {
        this.bln_loadForm = false;
        this.feedback.error(error)
      });
  }


  fnEditData(event) {
    console.log(event)
    let editEnfermedad = event.data;
    this.EnfermedadService_apis.fnEditEnfermedad(editEnfermedad)
      .then((res) => {
        this.feedback.success(res);
        event.fnSuccess();
        this.router.navigate(["system/admin/Enfermedad/control"])
      })
      .catch((rej) => {
        this.feedback.error(rej);
        event.fnError();
      })
  }

}
