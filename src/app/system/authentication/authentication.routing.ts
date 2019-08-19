import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './page-login/page-login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PageForgotPasswordComponent } from './page-forgot-password/page-forgot-password.component';

const routes: Routes = [
    {
        path: '',
        component: AuthenticationComponent,
        children: [
            { path: '', redirectTo: 'page-login', pathMatch: 'full' },
            { path: 'page-login', component: PageLoginComponent, data: { title: 'Login :: Katun' } },
            { path: 'page-forgot-password', component: PageForgotPasswordComponent, data: { title: 'Recuperar contraseña' } },
        ]
    }
];

export const routing = RouterModule.forChild(routes);