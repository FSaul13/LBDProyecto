import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { fnFormValidatorEqualFields } from '../../../components/form/form-helpers/extra-validations.helper';
import { FormSettings } from '../../../components/form/models-form/form-settings.model';
import { FormButton } from '../../../components/form/models-form/form-button.model';
import { FormColumns } from '../../../components/form/models-form/form-columns.model';
import { FormInput } from '../../../components/form/models-form/form-input.model';
import { UserTypesService } from '../../../services/user-types.service';
import { User } from '../../../models/user';
import { FormTitle } from '../../../components/form/models-form/form-title.model';
import { HeaderSettings } from '../../../components/action-header/action-header-models/header-settings.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings

  num_idEditUser: number;

  sub_users: Subscription;

  formGroup_form: FormGroup;

  any_settings: FormSettings = {
    title: {
      title: "Editar usuario"
    } as FormTitle,
    fields: {
      _idUsuario: {
        hide: true
      } as FormInput,
      _nombre: {
        label: "Nombre:",
        type: "text",
        trim: true
      } as FormInput,
      _apellidos: {
        label: "Apellido:",
        type: "text",
        trim: true
      } as FormInput,
      _correo: {
        label: "Correo:",
        type: "text",
        trim:true
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
      sendText: "Editar",
      loadText: "Editando...",
      successText: "Editado",
      errorText: "Error al editar",
      validToSend: true
    } as FormButton,
    resetOnSuccess: false
  } as FormSettings

  constructor(
    private route: ActivatedRoute,
    private userService_apis: UsersService,
    private toastr: ToastrService,
    private userTypes_apis: UserTypesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.num_idEditUser = params["id_user"];
      this.fnLoadViewData();
    });
  }

  ngOnDestroy() {
    if (this.sub_users) {
      this.sub_users.unsubscribe();
    }
    this.userTypes_apis.fnResetUserTypesArray();
    this.userService_apis.fnResetUser();
  }

  fnLoadViewData(): void {
    this.fnInitForm();
    this.fnSubscribeToUser();
    let arrayPromise_apis: Promise<any>[] = [
      this.fnGetUser(),
      this.fnGetUserTypes()
    ];
    Promise.all(arrayPromise_apis)
      .then(() => { })
      .catch(error => {
        this.toastr.error(error);
      })
  }

  fnGetUserTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userTypes_apis.fnGetUserTypes()
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error)
        });
    });

  }

  fnSubscribeToUser(): void {
    this.sub_users = this.userService_apis._user_recoverUser.subscribe(res => {
      if (res._idUsuario) {
        this.formGroup_form.setValue({
          _nombre: res._nombre,
          _apellidos: res._apellidos,
          _correo: res._correo,
          _idTipoUsuario: res._idTipoUsuario,
          _idUsuario: res._idUsuario
        } as User);
      }
    })
  }

  fnGetUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService_apis.fnGetUser(this.num_idEditUser)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  fnInitForm(): void {
    this.formGroup_form = new FormGroup({});
    this.formGroup_form.addControl("_idUsuario", new FormControl(null, [Validators.required]))
    this.formGroup_form.addControl("_nombre", new FormControl(null, [Validators.required]))
    this.formGroup_form.addControl("_apellidos", new FormControl(null, [Validators.required]))
    this.formGroup_form.addControl("_correo", new FormControl(null, [Validators.required, Validators.email]));
    this.formGroup_form.addControl("_idTipoUsuario", new FormControl(null, [Validators.required]))

  }

  fnSendData(event): void {
    let user_new: User = event.data;
    this.userService_apis.fnPostEditUser(user_new)
      .then(success => {
        this.toastr.success(success)
        event.fnSuccess();
      })
      .catch(error => {
        this.toastr.error(error)
        event.fnError();
      })
  }

}
