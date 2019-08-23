import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormSettings } from '../../../components/form/models-form/form-settings.model';
import { FormInput } from '../../../components/form/models-form/form-input.model';
import { Observable } from 'rxjs';
import "rxjs/add/observable/of";
import { FormColumns } from '../../../components/form/models-form/form-columns.model';
import { FormButton } from '../../../components/form/models-form/form-button.model';
import { UsersService } from '../../../services/users.service';
import { UserTypesService } from '../../../services/user-types.service';
import { User } from '../../../models/user';
import { fnFormValidatorEqualFields } from '../../../components/form/form-helpers/extra-validations.helper';
import { FormTitle } from '../../../components/form/models-form/form-title.model';
import { HeaderSettings } from '../../../components/action-header/action-header-models/header-settings.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.css']
})
export class UsersNewComponent implements OnInit {

  headerSettings_header:HeaderSettings = {
    backButton: true
  } as HeaderSettings

  formGroup_form: FormGroup;

  any_settings: FormSettings = {
    title: {
      title: "Nuevo usuario"
    } as FormTitle,
    fields: {
      _nombre: {
        label: "Nombre:",
        type: "text",
        trim:true
      } as FormInput,
      _apellidos: {
        label: "Apellido:",
        type: "text",
        trim:true
      } as FormInput,
      _correo: {
        label: "Correo:",
        type: "text",
        trim: true
      } as FormInput,
      _password: {
        label: "Contraseña:",
        type: "password"
      } as FormInput,
      _passwordConfirm: {
        label: "Confirmar contraseña:",
        type: "password"
      } as FormInput,
      _idTipoUsuario: {
        label: "Tipo usuario:",
        type: "select",
        options: this.userTypes_apis._userTypesArray_recoverUserTypes,
        key: "_idTipoUsuario",
        value: "_nombre"
      } as FormInput,
    },
    columns: {
      xl: 6,
      lg: 6,
      md: 6,
      sm: 12
    } as FormColumns,
    saveButton: {
      validToSend: true
    } as FormButton,
    resetOnSuccess: true
  } as FormSettings

  constructor(
    private userService_apis: UsersService,
    private userTypes_apis: UserTypesService,
    private toastr: ToastrService,
  ) {
    this.fnInitForm();
  }

  ngOnInit() {
    this.fnLoadViewData();
  }

  ngOnDestroy(){
    this.userTypes_apis.fnResetUserTypesArray();
  }

  fnLoadViewData(): void {
    this.fnGetUserTypes();
  }

  fnGetUserTypes(): void {
    this.userTypes_apis.fnGetUserTypes()
      .then(() => { })
      .catch(error => {
        this.toastr.error(error)
      });
  }

  fnInitForm(): void {
    this.formGroup_form = new FormGroup({});
    this.formGroup_form.addControl("_nombre",new FormControl(null, [Validators.required]))
    this.formGroup_form.addControl("_apellidos",new FormControl(null, [Validators.required]))
    this.formGroup_form.addControl("_correo",new FormControl(null, [Validators.required, Validators.email]))
    this.formGroup_form.addControl("_password",new FormControl(null, [Validators.required]))
    this.formGroup_form.addControl("_passwordConfirm",new FormControl(null, 
      [Validators.required,fnFormValidatorEqualFields(this.formGroup_form.get("_password"),"Los campos password deben coincidir")]));
    this.formGroup_form.addControl("_idTipoUsuario",new FormControl(null, [Validators.required]))
    
  }

  fnSendData(event): void {
    let user_new: User = event.data;
    this.userService_apis.fnPostCreateUser(user_new)
      .then(success => {
        this.toastr.success(success)
        event.fnSuccess();
      })
      .catch(error => {
        this.toastr.error(error)
        event.fnError();
      })
    //console.log(event);
  }

}
