import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleTratamientoService } from 'app/system/services/detalle-tratamiento.service';
import { TratamientoService } from 'app/system/services/tratamiento.service';
import { MedicamentoService } from 'app/system/services/medicamento.service';

@Component({
  selector: 'app-detalle-tratamiento-new',
  templateUrl: './detalle-tratamiento-new.component.html',
  styleUrls: ['./detalle-tratamiento-new.component.css']
})
export class DetalleTratamientoNewComponent implements OnInit {

  formgroup_newDetalleTratamiento: FormGroup;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  forSettings_config: FormSettings = {
    title: {
      title: 'Nuevo DetalleTratamiento'
    } as FormTitle,
    fields: {

      id_tratamiento_fk: {
        id: 'TratamientoSelect',
        label: 'Tratamiento',
        type: 'select',
        key: '_id_tratamiento',
        value: '_indicaciones',
        options: this.tratamientoApi_service._TratamientoArray_recoveryTratamiento,
      } as FormInput,

      id_medicamento_fk: {
        id: 'MedicamentoSelect',
        label: 'Medicamento',
        type: 'select',
        key: '_id_medicamento',
        value: '_nombre_comun',
        options: this.medicamentoApi_service._MedicamentoArray_recoveryMedicamento,
      } as FormInput,
      _max_cant_med:
        {
          label: 'Maxima cantidad medicamento',
          trim: true,
          type: 'text'
        } as FormInput,
      _min_can_med: {
        label: 'Minima cantidad de medicamento',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _periodo_dosificacion: {
        label: 'Periodo Dosificacion',
        trim: true,
        type: 'text'
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
    private DetalleTratamientoService_apis: DetalleTratamientoService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private tratamientoApi_service: TratamientoService,
    private medicamentoApi_service: MedicamentoService
  ) { }

  ngOnInit() {
    this.fnInitForm();
    this.fnGetMedicamento();
    this.fnGetTratamiento();
  }

  fnGetTratamiento() {
    this.tratamientoApi_service.fnGetTratamiento()
      .then(() => { })
      .catch(() => { })
  }

  fnGetMedicamento() {
    this.medicamentoApi_service.fnGetMedicamento()
      .then(() => { })
      .catch(() => { })

  }

  fnInitForm() {
    this.formgroup_newDetalleTratamiento = new FormGroup({
      id_tratamiento_fk: new FormControl(null, Validators.required),
      id_medicamento_fk: new FormControl(null, Validators.required),
      _max_cant_med: new FormControl(null, Validators.required),
      _min_can_med: new FormControl(null, Validators.required),
      _periodo_dosificacion: new FormControl(null, Validators.required),

    });
  }

  fnOnSend(event) {
    console.log(event);
    let newDetalleTratamiento = event.data;
    this.DetalleTratamientoService_apis.fnPostNewDetalleTratamiento(newDetalleTratamiento)
      .then((res) => {
        this.toastr.success(res);
        event.fnSuccess();

      })
      .catch((rej) => {
      });

  }

}
