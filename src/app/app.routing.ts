import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: 'system/admin', pathMatch: 'full' },
    { path: 'system/authentication', loadChildren: 'app/system/authentication/authentication.module#AuthenticationModule' },
    { path: 'system/admin', loadChildren: 'app/system/pages/admin.module#AdminModule' },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });