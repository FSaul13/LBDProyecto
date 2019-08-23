import { Component, OnInit } from '@angular/core';
import { FormSettings } from '../../../components/form/models-form/form-settings.model';
import { FormInput } from '../../../components/form/models-form/form-input.model';
import { FormColumns } from '../../../components/form/models-form/form-columns.model';
import { FormButton } from '../../../components/form/models-form/form-button.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserTypesService } from '../../../services/user-types.service';
import { FormTitle } from '../../../components/form/models-form/form-title.model';
import { TypeUser } from '../../../models/typeUser';
import { HeaderSettings } from '../../../components/action-header/action-header-models/header-settings.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-types-new',
  templateUrl: './user-types-new.component.html',
  styleUrls: ['./user-types-new.component.css']
})
export class UserTypesNewComponent implements OnInit {

  headerSettings_header:HeaderSettings = {
    backButton: true
  } as HeaderSettings

  formGroup_userType: FormGroup;

  formSettings_settings: FormSettings = {
    title: {
      title: "Nuevo tipo usuario"
    } as FormTitle,
    fields: {
      _nombre: {
        label: "Nombre:",
        type: "text",
        trim: true
      } as FormInput,
      _descripcion: {
        label: "Descripción:",
        type: "textarea",
        trim: true
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
    } as FormButton,
    resetOnSuccess: true
  } as FormSettings

  constructor(
    private toastr: ToastrService,
    private userTypesService_apis: UserTypesService
  ) {
    this.fnInitForm();
  }

  ngOnInit() {
  }

  fnInitForm(): void {
    this.formGroup_userType = new FormGroup({
      _nombre: new FormControl(null, [Validators.required]),
      _descripcion: new FormControl(null, [Validators.required]),
    });
  }

  fnSendData(event) {
    let userType_new: TypeUser = event.data;
    this.userTypesService_apis.fnPostNewUserType(userType_new)
      .then(success => { 
        this.toastr.success(success);
        event.fnSuccess();
      })
      .catch(error => { 
        this.toastr.error(error)
        event.fnError();
      })
  }

}
