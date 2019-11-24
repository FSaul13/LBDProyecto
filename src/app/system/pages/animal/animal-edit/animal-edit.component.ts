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
import { AnimalService } from 'app/system/services/animal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.component.html',
  styleUrls: ['./animal-edit.component.css']
})
export class AnimalEditComponent implements OnInit {

  sub_AnimalSubscription: Subscription;
  bln_loadForm: boolean = true;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  FormGroupEditAnimal: FormGroup;

  forSettings_config: FormSettings = {
    title: {
      title: 'Editar Animal'
    } as FormTitle,
    fields: {
      _id_animal: {
        hide: true
      } as FormInput,
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
          label: 'Imagen Muestra',
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
    } as FormButton,
    labelType: 'append',
    resetOnSuccess: true,
    _translate: true,
  } as FormSettings;

  constructor(
    private route: ActivatedRoute,
    private AnimalService_apis: AnimalService,
    private feedback: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fnInitformGroup();
    this.fnSubscribetoAnimal();
    this.route.params.subscribe(params => {
      console.log(params)
      this.fnGetProductCode(params._idAnimal);
    });
  }


  ngOnDestroy() {
    if (this.sub_AnimalSubscription) {
      this.sub_AnimalSubscription.unsubscribe();
    }
    this.AnimalService_apis.fnResetAnimal();
  }


  fnSubscribetoAnimal(): void {

    this.sub_AnimalSubscription = this.AnimalService_apis._Animal_recoveryproductCode.subscribe(res => {
      if (res._id_animal) {
        this.FormGroupEditAnimal.setValue({
          _id_animal: res._id_animal,
          _nombre: res._nombre,
          _caracteristicas: res._caracteristicas,
          _tipo_alimentacion: res._tipo_alimentacion,
          _tipo_animal: res._tipo_animal,
          _imagen_muestra: res._imagen_muestra


        });
      }
      else {
        this.FormGroupEditAnimal.markAsUntouched();
        this.FormGroupEditAnimal.reset();
      }
    });
  }



  fnInitformGroup() {
    this.FormGroupEditAnimal = new FormGroup({
      _id_animal: new FormControl(null),
      _nombre: new FormControl(null, Validators.required),
      _caracteristicas: new FormControl(null, Validators.required),
      _tipo_alimentacion: new FormControl(null, Validators.required),
      _tipo_animal: new FormControl(null, Validators.required),
      _imagen_muestra: new FormControl(null)
    })
  }

  fnGetProductCode(idAnimal: number) {
    this.bln_loadForm = true;
    this.AnimalService_apis.fnGetAnimalById(idAnimal)
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

    let editAnimal = event.data;

    this.AnimalService_apis.fnEditAnimal(editAnimal)
      .then((res) => {
        this.feedback.success(res);
        event.fnSuccess();
        this.router.navigate(["system/admin/animal/control"])
      })
      .catch((rej) => {
        this.feedback.error(rej);
        event.fnError();
      })
  }

}
