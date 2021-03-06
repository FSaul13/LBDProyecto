import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TratamientoService } from 'app/system/services/tratamiento.service';
import { ToastrService } from 'ngx-toastr';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';
import { EnfermedadService } from 'app/system/services/enfermedad.service';
import { FormComponent } from 'app/system/components/form/form/form.component';

@Component({
  selector: 'app-tratamiento-edit',
  templateUrl: './tratamiento-edit.component.html',
  styleUrls: ['./tratamiento-edit.component.css']
})
export class TratamientoEditComponent implements OnInit {

  sub_TratamientoSubscription: Subscription;
  bln_loadForm: boolean = true;
  @ViewChild(FormComponent) formComponent: ElementRef;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  FormGroupEditTratamiento: FormGroup;

  forSettings_config: FormSettings = {
    title: {
      title: 'Editar Tratamiento'
    } as FormTitle,
    fields: {
      _id_tratamiento: {
        hide: true
      } as FormInput,
      _indicaciones:
        {
          label: 'Indicaciones',
          trim: true,
          type: 'textarea'
        } as FormInput,
      _tipo_tratamiento: {
        label: 'Tipo Tratamiento',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _enfermedad: {
        id: "enfermedad",
        type: "table",
        label: 'Enfermedad',
        options: this.enfermedadApi_service._EnfermedadArray_recoveryEnfermedad,
        tableColumns: [{ title: 'Nombre', name: '_nombre_comun' }, { title: 'Virus', name: '_virus_causante' }],
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
    private TratamientoService_apis: TratamientoService,
    private feedback: ToastrService,
    private router: Router,
    private enfermedadApi_service: EnfermedadService
  ) { }

  ngOnInit() {
    this.fnInitformGroup();

    this.fnSubscribetoTratamiento();
    this.fnGetEnfermedad();
    this.route.params.subscribe(params => {
      this.fnGetProductCode(params._idTratamiento);
    });
  }

  fnGetEnfermedad() {
    this.enfermedadApi_service.fnGetEnfermedad()
      .then(() => { })
      .catch(() => { })
  }

  ngOnDestroy() {
    if (this.sub_TratamientoSubscription) {
      this.sub_TratamientoSubscription.unsubscribe();
    }
    this.TratamientoService_apis.fnResetTratamiento();
  }


  fnSubscribetoTratamiento(): void {

    this.sub_TratamientoSubscription = this.TratamientoService_apis._Tratamiento_recoveryproductCode.subscribe(res => {

      if (res._id_tratamiento) {
        console.log(res)
        const data = [];
        res._enfermedad.forEach(val => {
          console.log(val)
          data.push(val.id_enfermedad);
        })
        console.log(data);
        this.forSettings_config.fields._enfermedad._initTable = {
          _column: '_id_enfermedad',
          _values: data
        };
        this.FormGroupEditTratamiento.setValue({
          _id_tratamiento: res._id_tratamiento,
          _indicaciones: res._indicaciones,
          _tipo_tratamiento: res._tipo_tratamiento,
          _enfermedad: []
        });
        setTimeout(() => {

          const formComponent: FormComponent = this.formComponent as any;
          formComponent.fnInitTablesValue();
        }, 1000);
      }
      else {
        this.FormGroupEditTratamiento.markAsUntouched();
        this.FormGroupEditTratamiento.reset();
      }
    });
  }



  fnInitformGroup() {
    this.FormGroupEditTratamiento = new FormGroup({
      _id_tratamiento: new FormControl(null, Validators.required),
      _indicaciones: new FormControl(null, Validators.required),
      _tipo_tratamiento: new FormControl(null, Validators.required),
      _enfermedad: new FormControl(null, Validators.required)

    })
  }

  fnGetProductCode(idTratamiento: number) {
    this.bln_loadForm = true;
    this.TratamientoService_apis.fnGetTratamientoById(idTratamiento)
      .then(() => {
        this.bln_loadForm = false;
      })
      .catch(error => {
        this.bln_loadForm = false;
        this.feedback.error(error)
      })
  }


  fnEditData(event) {
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

    let editTratamiento = {
      _id_tratamiento: event.data._id_tratamiento,
      _indicaciones: event.data._indicaciones,
      _tipo_tratamiento: event.data._tipo_tratamiento,
      _enfermedad: str2

    }
    console.log(editTratamiento)


    this.TratamientoService_apis.fnEditTratamiento(editTratamiento)
      .then((res) => {
        this.feedback.success(res);
        event.fnSuccess();
        this.router.navigate(["system/admin/tratamiento/control"])
      })
      .catch((rej) => {
        this.feedback.error(rej);
        event.fnError();
      })
  }


}
