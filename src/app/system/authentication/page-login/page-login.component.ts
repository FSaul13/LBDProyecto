import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { AuthenticacionService } from '../../services/authenticacion.service';
import { Response } from '../../models/response';
import { FeedbackService } from '../../services/feedback.service';
import { SpinnerService } from '../../../layout/spinner/spiner.service';
import { LoginResponse } from '../../models/loginResponse';
import { SessionService } from '../../services/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
	styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

	form_login:FormGroup;

	constructor(
		private router: Router,
		private srv_api:AuthenticacionService,
		private srv_feedback:FeedbackService,
		private srv_spinner:SpinnerService,
		private toastr: ToastrService,
		private srv_session:SessionService
		) { }

	ngOnInit() {
		this.form_login = new FormGroup({
			_correo: new FormControl(null,[Validators.required,Validators.email]),
			_password: new FormControl(null,[Validators.required])
		});
		this.srv_session._loginResponse_session.subscribe(res=>{
			if(res){
				this.router.navigate(['system/admin/dashboard/index']);
			}
		})
	}

	onSubmit(){
		this.router.navigate(['/admin/dashboard/index']);
	}

	fnLogin(){
		this.srv_spinner.fnOnSpinner();
		let login_userData:Login = this.form_login.getRawValue() as Login;
		this.srv_api.fnLogin(login_userData)
		.then(()=>{
			this.srv_spinner.fnOffSpinner();
		})
		.catch(rej=>{
			this.toastr.error(rej,"Error");
			this.srv_spinner.fnOffSpinner();
		})
	}
}
