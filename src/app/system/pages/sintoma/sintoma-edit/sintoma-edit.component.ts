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
      _id_Sintoma: {
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
    } as FormButton,
    labelType: 'append',
    resetOnSuccess: true,
    _translate: true,
  } as FormSettings;

  constructor(
    private route: ActivatedRoute,
    private SintomaService_apis: SintomaService,
    private feedback: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fnInitformGroup();
    this.fnSubscribetoSintoma();
    this.route.params.subscribe(params => {
      this.fnGetProductCode(params.idSintoma);
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
      if (res._idSintoma) {
        this.FormGroupEditSintoma.setValue({
          _id_Sintoma: res._idSintoma,
          _descripcion: res._descripcion,
          _imagen_muestra: res._imagen_muestra
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
      _id_Sintoma: new FormControl(null, Validators.required),
      _descripcion: new FormControl(null, Validators.required),
      _imagen_muestra: new FormControl(null)
    })
  }

  fnGetProductCode(idSintoma: number) {
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
    let editSintoma = event.data;
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
