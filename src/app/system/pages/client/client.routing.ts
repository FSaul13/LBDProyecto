import { Routes } from '@angular/router';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientControlComponent } from './client-control/client-control.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientComponent } from './client/client.component';

export const ClientRouting: Routes = [
    {
        path: "",
        component: ClientComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {  
                path: "control",
                component: ClientControlComponent,
                data: {
                    title: "Control de cliente"
                }
            },
            {
                path: "new",
                component: ClientNewComponent,
                data: {
                    title: "Agregar cliente"
                }
            },
            {
                path: "edit/:idCliente",
                component: ClientEditComponent,
                data: {
                    title: "Editar clientes"
                }
            }
        ]
    },
    
];