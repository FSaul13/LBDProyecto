import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { TratamientoService } from 'app/system/services/tratamiento.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';
import { EnfermedadService } from 'app/system/services/enfermedad.service';

@Component({
  selector: 'app-tratamiento-new',
  templateUrl: './tratamiento-new.component.html',
  styleUrls: ['./tratamiento-new.component.css']
})
export class TratamientoNewComponent implements OnInit {

  formgroup_newTratamiento: FormGroup;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  forSettings_config: FormSettings = {
    title: {
      title: 'Nuevo Tratamiento'
    } as FormTitle,
    fields: {
      _indicaciones:
        {
          label: 'Indicaciones',
          trim: true,
          type: 'textarea'
        } as FormInput,
      _tipo_Tratamiento: {
        label: 'Tipo Tratamiento',
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
      sendText: "Enviar"

    } as FormButton,
    labelType: 'append',
    resetOnSuccess: true,
    _translate: true,
  } as FormSettings;


  constructor(
    private TratamientoService_apis: TratamientoService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private enfermedadApi_service: EnfermedadService
  ) { }

  ngOnInit() {
    this.fnInitForm();
    this.fnGetEnfermedad();
  }

  fnInitForm() {
    this.formgroup_newTratamiento = new FormGroup({
      _indicaciones: new FormControl(null, Validators.required),
      _tipo_Tratamiento: new FormControl(null, Validators.required),
      _enfermedad: new FormControl(null, Validators.required)


    });
  }
  fnGetEnfermedad() {
    this.enfermedadApi_service.fnGetEnfermedad()
      .then(() => { })
      .catch(() => { })
  }

  fnOnSend(event) {

    console.log(event);
    let str1 = new String();

    event.data._enfermedad.forEach(element => {
      console.log(element.id_enfermedad);
      str1 += element.id_enfermedad;
      str1 += ','
    });
    let str2 = str1.substring(0, str1.length - 1)

    console.log(str2)
    console.log("llego");
    let newTratamiento = {

      _indicaciones: event.data._indicaciones,
      _tipo_Tratamiento: event.data._tipo_Tratamiento,
      _enfermedad: str2

    }
    console.log(newTratamiento)
    /*
      this.TratamientoService_apis.fnPostNewTratamiento(newTratamiento)
        .then((res) => {
          this.toastr.success(res);
          event.fnSuccess();
  
        })
        .catch((rej) => {
        });
  */
  }


}
