import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'app/system/services/animal.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-animal-new',
  templateUrl: './animal-new.component.html',
  styleUrls: ['./animal-new.component.css']
})
export class AnimalNewComponent implements OnInit {
  formgroup_newAnimal: FormGroup;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  forSettings_config: FormSettings = {
    title: {
      title: 'Nuevo Animal'
    } as FormTitle,
    fields: {
      _nombre:
        {
          label: 'Nombre',
          trim: true,
          type: 'text'
        } as FormInput,
      _caracteristicas: {
        label: 'Caracteristicas',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _tipo_alimentacion: {
        label: 'Tipo Alimentacion',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _tipo_animal:
        {
          label: 'Tipo Animal',
          trim: true,
          type: 'text'
        } as FormInput,
      _imagen_muestra:
        {
          label: 'Imagen muestra',
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
    private AnimalService_apis: AnimalService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.fnInitForm();
  }

  fnInitForm() {
    this.formgroup_newAnimal = new FormGroup({
      _nombre: new FormControl(null, Validators.required),
      _caracteristicas: new FormControl(null, Validators.required),
      _tipo_alimentacion: new FormControl(null, Validators.required),
      _tipo_animal: new FormControl(null, Validators.required),
      _imagen_muestra: new FormControl(null)

    });
  }

  fnOnSend(event) {
    console.log(event);
    let newAnimal = event.data;
    this.AnimalService_apis.fnPostNewAnimal(newAnimal)
      .then((res) => {
        this.toastr.success(res);
        event.fnSuccess();

      })
      .catch((rej) => {
      });

  }

}
