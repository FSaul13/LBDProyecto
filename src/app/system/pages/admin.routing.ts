import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [   
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo:'dashboard'},
            {
                path: 'dashboard',
                children: [
                    { path: '', redirectTo: 'index', pathMatch: 'full' },
                    { path: 'index', component: IndexComponent, data: { title: ':: Lucid Angular :: Dashboard :: Analytical ::' } }
                ]
            },
            {
                path: "users",
                loadChildren: "../pages/users/users.module#UsersModule"
            },
            {
                path: "user-types",
                loadChildren: "../pages/user-types/user-types.module#UserTypesModule"
            },
            {
                path: "territories",
                loadChildren: "../pages/territories/territories.module#TerritoriesModule"
            },
            {
                path: "client",
                loadChildren: "../pages/client/client.module#ClientModule"
            }
        ]
    },
    
];

export const routing = RouterModule.forChild(routes);