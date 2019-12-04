import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'app/system/services/consultas.service';
import { SintomaService } from 'app/system/services/sintoma.service';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-consulta-enfermedad-sintoma',
  templateUrl: './consulta-enfermedad-sintoma.component.html',
  styleUrls: ['./consulta-enfermedad-sintoma.component.css']
})
export class ConsultaEnfermedadSintomaComponent implements OnInit {


  formgroup_newSintoma: FormGroup;
  forSettings_config: FormSettings = {
    title: {
      title: 'Nuevo Sintoma'
    } as FormTitle,
    fields: {

      _id_sintoma1: {
        id: 'SintomaSelect',
        label: 'Sintoma 1',
        type: 'select',
        key: '_id_sintoma',
        value: '_descripcion',
        options: this.sintomaApi_service._SintomaArray_recoverySintoma
      } as FormInput,
      _id_sintoma2: {
        id: 'SintomaSelect',
        label: 'Sintoma 2',
        type: 'select',
        key: '_id_sintoma',
        value: '_descripcion',
        options: this.sintomaApi_service._SintomaArray_recoverySintoma
      } as FormInput,
      _id_sintoma3: {
        id: 'SintomaSelect',
        label: 'Sintoma 3',
        type: 'select',
        key: '_id_sintoma',
        value: '_descripcion',
        options: this.sintomaApi_service._SintomaArray_recoverySintoma
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
    private consultaApi_service: ConsultasService,
    private sintomaApi_service: SintomaService
  ) { }

  ngOnInit() {
    this.fnInitForm();
    this.fnGetSintoma()
  }
  ngOnDestroy() {
    this.consultaApi_service.fnResetConsultas()
  }

  fnInitForm() {
    this.formgroup_newSintoma = new FormGroup({

      _id_sintoma1: new FormControl(null, Validators.required),
      _id_sintoma2: new FormControl(null, Validators.required),
      _id_sintoma3: new FormControl(null, Validators.required)
    });
  }



  fnGetSintoma() {
    this.sintomaApi_service.fnGetSintoma()
      .then(() => { })
      .catch(() => { })
  }


  fnGetCosulta(event) {
    console.log(event);
  }

}
