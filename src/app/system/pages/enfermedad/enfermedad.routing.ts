import { Routes } from '@angular/router';

import { EnfermedadComponent } from './enfermedad/enfermedad.component';

import { EnfermedadControlComponent } from './enfermedad-control/enfermedad-control.component';

import { EnfermedadNewComponent } from './enfermedad-new/enfermedad-new.component';

import { EnfermedadEditComponent } from './enfermedad-edit/enfermedad-edit.component';

export const EnfermedadRouting: Routes = [
    {
        path: "",
        component: EnfermedadComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {
                path: "control",
                component: EnfermedadControlComponent,
                data: {
                    title: "Control de tipos de Enfermedad",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de Enfermedads' }
                    ]
                }
            },
            {
                path: "new",
                component: EnfermedadNewComponent,
                data: {
                    title: "Agregar tipo Enfermedad",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de Enfermedad', url: '/system/Enfermedad/control' },
                        { title: 'Alta' }
                    ]
                }
            },
            {
                path: "edit/:_idEnfermedad",
                component: EnfermedadEditComponent,
                data: {
                    title: "Editar Enfermedad",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de Enfermedad', url: '/system/Enfermedad/control' },
                        { title: 'Editar' }
                    ]
                }
            }
        ]
    },

];
