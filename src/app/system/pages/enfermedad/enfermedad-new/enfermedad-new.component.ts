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
  ) { }

  ngOnInit() {
    this.fnInitForm();
  }

  fnInitForm() {
    this.formgroup_newEnfermedad = new FormGroup({
      _nombre_comun: new FormControl(null, Validators.required),
      _grado_mortalidad: new FormControl(null, Validators.required),
      _virus_causante: new FormControl(null, Validators.required),
      _causas_infeccion: new FormControl(null, Validators.required),

    });
  }

  fnOnSend(event) {
    console.log(event);
    let newEnfermedad = event.data;
    this.EnfermedadService_apis.fnPostNewEnfermedad(newEnfermedad)
      .then((res) => {
        this.toastr.success(res);
        event.fnSuccess();

      })
      .catch((rej) => {
      });

  }

}
