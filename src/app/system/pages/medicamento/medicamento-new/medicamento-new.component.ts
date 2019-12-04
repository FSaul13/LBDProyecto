import { Component, OnInit } from '@angular/core';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { MedicamentoService } from 'app/system/services/medicamento.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-medicamento-new',
  templateUrl: './medicamento-new.component.html',
  styleUrls: ['./medicamento-new.component.css']
})
export class MedicamentoNewComponent implements OnInit {

  formgroup_newMedicamento: FormGroup;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  forSettings_config: FormSettings = {
    title: {
      title: 'Nuevo Medicamento'
    } as FormTitle,
    fields: {

      _nombre_comun:
        {
          label: 'Nombre',
          trim: true,
          type: 'text'
        } as FormInput,
      _activo: {
        label: 'Activo',
        trim: true,
        type: 'text'
      } as FormInput,
      _tipo_medicamento: {
        label: 'Tipo Medicamento',
        trim: true,
        type: 'text'
      } as FormInput,
      _efectos_secundarios: {
        label: 'Efectos Secundarios',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _laboratorio: {
        label: 'Laboratorio',
        trim: true,
        type: 'text'
      } as FormInput,
      _precio: {
        label: 'Precio',
        type: 'number'
      } as FormInput,
      _imagen_muestra: {
        label: 'Imagen muestra',
        trim: true,
        type: 'text'
      } as FormInput


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
    private MedicamentoService_apis: MedicamentoService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.fnInitForm();
  }

  fnInitForm() {
    this.formgroup_newMedicamento = new FormGroup({
      _nombre_comun: new FormControl(null, Validators.required),
      _activo: new FormControl(null, Validators.required),
      _tipo_medicamento: new FormControl(null, Validators.required),
      _efectos_secundarios: new FormControl(null, Validators.required),
      _laboratorio: new FormControl(null, Validators.required),
      _precio: new FormControl(null, Validators.required),
      _imagen_muestra: new FormControl(null)

    });
  }

  fnOnSend(event) {
    console.log(event);
    let newMedicamento = event.data;
    this.MedicamentoService_apis.fnPostNewMedicamento(newMedicamento)
      .then((res) => {
        this.toastr.success(res);
        event.fnSuccess();

      })
      .catch((rej) => {
      });

  }

}
