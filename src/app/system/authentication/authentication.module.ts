import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoginComponent } from './page-login/page-login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { routing } from './authentication.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PageForgotPasswordComponent } from './page-forgot-password/page-forgot-password.component';

@NgModule({
	declarations: [PageLoginComponent, AuthenticationComponent,PageForgotPasswordComponent],
	imports: [
		CommonModule,
		routing,
		ReactiveFormsModule,
		//PagesModule,
        RouterModule,
		FormsModule,
		
		TranslateModule.forChild()
		
	]
})
export class AuthenticationModule { }
