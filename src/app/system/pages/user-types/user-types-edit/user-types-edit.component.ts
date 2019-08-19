import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormSettings } from '../../../components/form/models-form/form-settings.model';
import { FormInput } from '../../../components/form/models-form/form-input.model';
import { FormTitle } from '../../../components/form/models-form/form-title.model';
import { FormColumns } from '../../../components/form/models-form/form-columns.model';
import { FormButton } from '../../../components/form/models-form/form-button.model';
import { UserTypesService } from '../../../services/user-types.service';
import { TypeUser } from '../../../models/typeUser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderSettings } from '../../../components/action-header/action-header-models/header-settings.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-types-edit',
  templateUrl: './user-types-edit.component.html',
  styleUrls: ['./user-types-edit.component.css']
})
export class UserTypesEditComponent implements OnInit {

  headerSettings_header:HeaderSettings = {
    backButton: true
  } as HeaderSettings

  formGroup_userType: FormGroup;
  num_idUserType:number;

  sub_userType:Subscription;

  formSettings_settings: FormSettings = {
    title: {
      title: "Editar tipo usuario"
    } as FormTitle,
    fields: {
      _idTipoUsuario:{
        hide: true
      } as FormInput,
      _nombre: {
        label: "Nombre:",
        type: "text"
      } as FormInput,
      _descripcion: {
        label: "Descripción:",
        type: "textarea"
      } as FormInput
    },
    columns: {
      xl: 12,
      lg: 12,
      md: 12,
      sm: 12
    } as FormColumns,
    saveButton: {
      validToSend: true
    } as FormButton
  } as FormSettings

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userTypesService_apis: UserTypesService
  ) {
    this.fnInitForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.num_idUserType = params["id_userType"];
      this.fnLoadViewData();
    });
  }

  ngOnDestroy(){
    if(this.sub_userType){
      this.sub_userType.unsubscribe();
    }
  }

  fnLoadViewData():void{
    this.fnSubscribeToUserType();
    this.fnGetUserType();
  }

  fnSubscribeToUserType():void{
    this.sub_userType = this.userTypesService_apis._userType_recoverUserType.subscribe(res=>{
      if(res._idTipoUsuario){
        this.formGroup_userType.setValue({
          _idTipoUsuario: res._idTipoUsuario,
          _nombre: res._nombre,
          _descripcion: res._descripcion
        } as TypeUser);
      }
    });
  }

  fnGetUserType():void{
    this.userTypesService_apis.fnGetUserTypeById(this.num_idUserType)
    .then(()=>{})
    .catch(error=>{
      this.toastr.error(error)
    })
  }

  fnInitForm(): void {
    this.formGroup_userType = new FormGroup({
      _idTipoUsuario: new FormControl(null,[Validators.required]),
      _nombre: new FormControl(null, [Validators.required]),
      _descripcion: new FormControl(null, [Validators.required]),
    });
  }

  fnSendData(event) {
    let userType_new: TypeUser = event.data;
    this.userTypesService_apis.fnPostEditUserType(userType_new)
      .then(success => { 
        this.toastr.success(success)
        event.fnSuccess();
      })
      .catch(error => { 
        this.toastr.error(error);
        event.fnError();
      })
  }

}
