import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TableSettings } from '../../../components/table/models-table/table-settings.model';
import { TableButtons } from '../../../components/table/models-table/table-buttons.model';
import { TableColors } from '../../../components/table/models-table/table-colors.model';
import { TablePagination } from '../../../components/table/models-table/table-pagination.model';
import { TableSearch } from '../../../components/table/models-table/taable-search.model';
import { TableExtraButtons } from '../../../components/table/models-table/table-extra-buttons.model';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { HeaderSettings } from '../../../components/action-header/action-header-models/header-settings.model';
import { HeaderExtraButton } from '../../../components/action-header/action-header-models/header-extra-button.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormSettings } from '../../../components/form/models-form/form-settings.model';
import { FormInput } from '../../../components/form/models-form/form-input.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fnFormValidatorEqualFields } from '../../../components/form/form-helpers/extra-validations.helper';
import { FormButton } from '../../../components/form/models-form/form-button.model';

@Component({
  selector: 'app-users-control',
  templateUrl: './users-control.component.html',
  styleUrls: ['./users-control.component.css']
})
export class UsersControlComponent implements OnInit {

  @ViewChild("deleteModal") model_delete: ElementRef;
  @ViewChild("changePassword") modal_password: ElementRef;

  any_deleteEvent: any;

  headerSettings_header: HeaderSettings = {
    extraButtons: true,
    alignExtraButtons: "end",
    buttons: [
      { icon: "fas fa-plus", id: "new" } as HeaderExtraButton
    ]
  } as HeaderSettings;

  formSettings_formPassword:FormSettings = {
    fields: {
      _idUsuario: {
        hide: true
      } as FormInput,
      _passwordConfirmar: {
        type: "password",
        label: "Confirmar contraseña",
        placeholder: "confirma nuevac ontraseña"
      } as FormInput,
      _password: {
        type: "password",
        label: "Nueva contraseña",
        placeholder: "Ingresa la nueva contraseña"
      } as FormInput
    },
    saveButton: {
      validToSend: true
    } as FormButton
  } as FormSettings;

  formGroup_formPassword:FormGroup;

  arrayAny_columns: any[] = [
    { name: "_nombre", title: "Nombre" },
    { name: "_apellidos", title: "Apellidos" },
    { name: "_correo", title: "Correo" }
  ]

  settings: TableSettings = {
    buttons: {
      delete: true,
      edit: true,
      extras: true,
      extraButtons: [
        {
          icon: "fas fa-key",
          name: "change-password"
        } as TableExtraButtons
      ],
      colors: {
        normal: "#118c84",
        hover: "#3a3296"
      } as TableColors
    } as TableButtons,
    pagination: {
      loadOnChange: false,
      nextLabel: "Siguiente",
      prebiousLabel: "Anterior",
      itemsPerPage: 5
    } as TablePagination,
    search: {
      placeholder: "Buscar por nombre y apellidos...",
      searchColumns: ["_nombre", "_apellidos"]
    } as TableSearch
  } as TableSettings;

  obs_users: Observable<User[]>;

  str_deleteUser: string;
  str_passwordUser: string;

  constructor(
    private usersService_apis: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.obs_users = usersService_apis._users_recoverUsers;
  }

  ngOnInit() {
    this.fnInitForm();
    this.fnGetUsers();
  }

  ngOnDestroy() {
    this.usersService_apis.fnResetUsersArray();
  }

  fnInitForm():void{
    this.formGroup_formPassword = new FormGroup({
      _idUsuario: new FormControl(null,Validators.required)
    });
    this.formGroup_formPassword.addControl("_password", new FormControl(null,Validators.required));
    this.formGroup_formPassword.addControl("_passwordConfirmar", new FormControl(null,[Validators.required,
      fnFormValidatorEqualFields(this.formGroup_formPassword.get("_password"),"Los campos de contraseña y confirmar contraseña deben coincidir")]));
    
  }

  fnGetUsers(): void {
    this.usersService_apis.fnGetUsers()
      .then(() => { })
      .catch(error => { 
        this.toastr.error(error)
      });
  }

  fnOnEdit(event): void {
    let user_edit: User = event.data;
    this.router.navigate(["/system/admin/users/edit/", user_edit._idUsuario]);
  }

  fnOnDelete(event): void {
    this.any_deleteEvent = event;
    this.str_deleteUser = (event.data._nombre ? event.data._nombre : "") + " " + (event.data._apellidos ? event.data._apellidos : "");
    this.fnOpenModal(this.model_delete, "md")
  }

  fnClickExtraButton(event) {
    if (event == "new") {
      this.router.navigate(["system/admin/users/new"]);
    }
  }

  fnOpenModal(content, size) {
    this.str_deleteButton = this.str_sendDeleteButton;
    this.modalService.open(content, { size: size });
  }

  bln_loadDelete:boolean;
  str_loadDeleteButton:string = '<i class="fas fa-spinner fa-spin"></i> Eliminando';
  str_errorDeleteButton:string = '<i class="fas fa-times-circle"></i> Error';
  str_successDeleteButton:string = '<i class="fas fa-check-circle"></i> Eliminado'
  str_sendDeleteButton:string = 'Eliminar';
  str_deleteButton:string = this.str_sendDeleteButton;
  fnConfirmDelete(modal: any): void {
    if(this.bln_loadDelete){
      return;
    }
    this.str_deleteButton = this.str_loadDeleteButton;
    this.bln_loadDelete = true;
    let user_delete: User = this.any_deleteEvent.data;
    this.usersService_apis.fnPostDeleteUser(user_delete)
      .then(success => {
        modal.dismiss('Close click');
        this.str_deleteButton = this.str_successDeleteButton;
        this.bln_loadDelete = false;
        this.any_deleteEvent.fnConfirmDelete();
        this.toastr.success(success);
      })
      .catch(error => {
        this.str_deleteButton = this.str_errorDeleteButton;
        this.bln_loadDelete = false;
        this.toastr.error(error)
      })

  }

  fnOnExtraButtonClick(event){
    this.formGroup_formPassword.get("_idUsuario").setValue(event.data._idUsuario)
    this.str_passwordUser = (event.data._nombre ? event.data._nombre : "") + " " + (event.data._apellidos ? event.data._apellidos : "");
    this.fnOpenModal(this.modal_password, "md")
  }

  fnSendData(event,modal){
    console.log(event)
    this.usersService_apis.fnChangeUserPassword(event.data)
    .then((success)=>{
      this.toastr.success(success);
      event.fnSuccess();
      this.fnClosePasswordModal(modal);
    })
    .catch((error)=>{
      this.toastr.error(error);
      event.fnError();
    })
  }

  fnClosePasswordModal(modal):void{
    this.formGroup_formPassword.reset();
    this.formGroup_formPassword.markAsUntouched();
    modal.close('Ok click');
  }

}
