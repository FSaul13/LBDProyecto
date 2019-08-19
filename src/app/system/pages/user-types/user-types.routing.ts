import { Routes } from '@angular/router';
import { UserTypesComponent } from './user-types/user-types.component';
import { UserTypesControlComponent } from './user-types-control/user-types-control.component';
import { UserTypesNewComponent } from './user-types-new/user-types-new.component';
import { UserTypesEditComponent } from './user-types-edit/user-types-edit.component';

export const UsersTypesRouting: Routes = [
    {
        path: "",
        component: UserTypesComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {  
                path: "control",
                component: UserTypesControlComponent,
                data: {
                    title: "Control de tipos de usuario",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de usuarios' }
                    ]
                }
            },
            {
                path: "new",
                component: UserTypesNewComponent,
                data: {
                    title: "Agregar tipo usuario",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de usuario' ,url: '/system/user-types/control'},
                        { title: 'Alta'}
                    ]
                }
            },
            {
                path: "edit/:id_userType",
                component: UserTypesEditComponent,
                data: {
                    title: "Editar usuario",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de usuario' ,url: '/system/user-types/control'},
                        { title: 'Editar'}
                    ]
                }
            }
        ]
    },
    
];
