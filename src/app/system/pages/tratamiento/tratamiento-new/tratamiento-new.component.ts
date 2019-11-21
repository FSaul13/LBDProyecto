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
  ) { }

  ngOnInit() {
    this.fnInitForm();
  }

  fnInitForm() {
    this.formgroup_newTratamiento = new FormGroup({
      _indicaciones: new FormControl(null, Validators.required),
      _tipo_Tratamiento: new FormControl(null, Validators.required),

    });
  }

  fnOnSend(event) {
    console.log(event);
    let newTratamiento = event.data;
    this.TratamientoService_apis.fnPostNewTratamiento(newTratamiento)
      .then((res) => {
        this.toastr.success(res);
        event.fnSuccess();

      })
      .catch((rej) => {
      });

  }


}
