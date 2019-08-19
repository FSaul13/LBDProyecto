import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticacionService } from '../../services/authenticacion.service';
import { of } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-page-forgot-password',
  templateUrl: './page-forgot-password.component.html',
  styleUrls: ['./page-forgot-password.component.css']
})
export class PageForgotPasswordComponent implements OnInit {

    formGroup_form:FormGroup;

    
    str_sendResetButton:string = 'ENVIAR';
    str_succesResetButton:string = '<i class="fas fa-check-circle"></i> ENVIADO';
    str_errorResetButton:string = '<i class="fas fa-times-circle"></i> ERROR AL ENVIAR';
    str_loadResetButton:string = '<i class="fas fa-spinner fa-spin"></i> ENVIANDO';
    str_resetButton:string = this.str_sendResetButton;
    bln_sending:boolean;

    constructor(
      private router: Router,
      private authenticationService_apis:AuthenticacionService
    ) { }

    ngOnInit() {
      this.fnInitForm();
    }

    fnInitForm():void{
      this.formGroup_form = new FormGroup({
        _correo:new FormControl(null,[Validators.required,Validators.email])
      })
    }

    fnOnSubmitResetPassword():void{
      if(this.bln_sending){
        return;
      }
      this.bln_sending = true;
      this.str_resetButton = this.str_loadResetButton;
      let user_reset:User = this.formGroup_form.getRawValue();
      this.authenticationService_apis.fnResetPassword(user_reset)
      .then(res=>{
        console.log(res)
        this.bln_sending = false;
        this.str_resetButton = this.str_succesResetButton;
      })
      .catch(rej=>{
        console.log(rej)
        this.bln_sending = false;
        this.str_resetButton = this.str_errorResetButton;
      })
    }

}
