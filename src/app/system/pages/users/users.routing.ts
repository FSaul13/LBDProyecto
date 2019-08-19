import { Routes } from '@angular/router';
import { UsersControlComponent } from './users-control/users-control.component';
import { UsersComponent } from './users/users.component';
import { UsersNewComponent } from './users-new/users-new.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

export const UsersRouting: Routes = [
    {
        path: "",
        component: UsersComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {  
                path: "control",
                component: UsersControlComponent,
                data: {
                    title: "Control de usuarios",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de usuarios' }
                    ]
                }
            },
            {
                path: "new",
                component: UsersNewComponent,
                data: {
                    title: "Agregar usuario",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de usuarios' ,url: '/system/users/control'},
                        { title: 'Alta'}
                    ]
                }
            },
            {
                path: "edit/:id_user",
                component: UsersEditComponent,
                data: {
                    title: "Editar usuario",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de usuarios' ,url: '/system/users/control'},
                        { title: 'Editar'}
                    ]
                }
            }
        ]
    },
    
];
