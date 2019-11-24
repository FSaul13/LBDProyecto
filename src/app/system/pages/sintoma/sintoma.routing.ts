import { Routes } from '@angular/router';
import { SintomaComponent } from './sintoma/sintoma.component';
import { SintomaControlComponent } from './sintoma-control/sintoma-control.component';
import { SintomaNewComponent } from './sintoma-new/sintoma-new.component';
import { SintomaEditComponent } from './sintoma-edit/sintoma-edit.component';

export const SintomaRouting: Routes = [
    {
        path: "",
        component: SintomaComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {
                path: "control",
                component: SintomaControlComponent,
                data: {
                    title: "Control de tipos de Sintoma",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de Sintomas' }
                    ]
                }
            },
            {
                path: "new",
                component: SintomaNewComponent,
                data: {
                    title: "Agregar tipo Sintoma",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de Sintoma', url: '/system/Sintoma/control' },
                        { title: 'Alta' }
                    ]
                }
            },
            {
                path: "edit/:_idSintoma",
                component: SintomaEditComponent,
                data: {
                    title: "Editar Sintoma",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de Sintoma', url: '/system/Sintoma/control' },
                        { title: 'Editar' }
                    ]
                }
            }
        ]
    },

];
