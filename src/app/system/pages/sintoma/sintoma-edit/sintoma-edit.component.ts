import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SintomaService } from 'app/system/services/sintoma.service';
import { ToastrService } from 'ngx-toastr';
import { EnfermedadService } from 'app/system/services/enfermedad.service';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';

@Component({
  selector: 'app-sintoma-edit',
  templateUrl: './sintoma-edit.component.html',
  styleUrls: ['./sintoma-edit.component.css']
})
export class SintomaEditComponent implements OnInit {

  sub_SintomaSubscription: Subscription;
  bln_loadForm: boolean = true;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  FormGroupEditSintoma: FormGroup;

  forSettings_config: FormSettings = {
    title: {
      title: 'Editar Sintoma'
    } as FormTitle,
    fields: {
      _id_sintoma: {
        hide: true
      } as FormInput,
      _descripcion: {
        label: 'Caracteristicas',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _imagen_muestra: {
        label: 'Imagen',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _enfermedad: {
        id: "enfermedad",
        type: "table",
        label: 'Enfermedad',
        options: this.enfermedadApi_service._EnfermedadArray_recoveryEnfermedad,
        tableColumns: [{ title: 'Nombre', name: ' _nombre_comun' }, { title: 'Virus', name: '_virus_causante' }],
        tableFilters: {
          filters: [
            { type: "text", label: "Nombre", filterColum: "_nombre_comun" } as FormTableFilters,
            { type: "text", label: "virus", filterColum: "_virus_causante" } as FormTableFilters,
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
    private SintomaService_apis: SintomaService,
    private feedback: ToastrService,
    private router: Router,
    private enfermedadApi_service: EnfermedadService
  ) { }

  ngOnInit() {
    this.fnInitformGroup();
    this.fnGetEnfermedad();
    this.fnSubscribetoSintoma();
    this.route.params.subscribe(params => {
      console.log(params)
      this.fnGetSintoma(params._idSintoma);
    });
  }


  ngOnDestroy() {
    if (this.sub_SintomaSubscription) {
      this.sub_SintomaSubscription.unsubscribe();
    }
    this.SintomaService_apis.fnResetSintoma();
  }


  fnSubscribetoSintoma(): void {

    this.sub_SintomaSubscription = this.SintomaService_apis._Sintoma_recoveryproductCode.subscribe(res => {
      if (res._id_sintoma) {
        this.FormGroupEditSintoma.setValue({
          _id_sintoma: res._id_sintoma,
          _descripcion: res._descripcion,
          _imagen_muestra: res._imagen_muestra,
          _enfermedad: res._enfermedad
        });
      }
      else {
        this.FormGroupEditSintoma.markAsUntouched();
        this.FormGroupEditSintoma.reset();
      }
    });
  }



  fnInitformGroup() {
    this.FormGroupEditSintoma = new FormGroup({
      _id_sintoma: new FormControl(null, Validators.required),
      _descripcion: new FormControl(null, Validators.required),
      _imagen_muestra: new FormControl(null),
      _enfermedad: new FormControl(null, Validators.required)
    })
  }

  fnGetEnfermedad() {
    this.enfermedadApi_service.fnGetEnfermedad()
      .then(() => { })
      .catch(() => { })
  }


  fnGetSintoma(idSintoma: number) {
    this.bln_loadForm = true;
    this.SintomaService_apis.fnGetSintomaById(idSintoma)
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
    console.log(event);
    let str1 = new String();

    event.data._enfermedad.forEach(element => {
      console.log(element._id_enfermedad);
      str1 += element._id_enfermedad;
      str1 += ','
    });
    let str2 = str1.substring(0, str1.length - 1)

    console.log(str2)
    console.log("llego");
    let editSintoma = {
      _id_sintoma: event.data._id_sintoma,
      _descripcion: event.data._descripcion,
      _imagen_muestra: event.data._imagen_muestra,
      _enfermedad: str2

    }
    console.log(editSintoma)

    this.SintomaService_apis.fnEditSintoma(editSintoma)
      .then((res) => {
        this.feedback.success(res);
        event.fnSuccess();
        this.router.navigate(["system/admin/sintoma/control"])
      })
      .catch((rej) => {
        this.feedback.error(rej);
        event.fnError();
      })
  }
}
