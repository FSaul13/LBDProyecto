import { Routes } from '@angular/router';

import { MedicamentoComponent } from './medicamento/medicamento.component';

import { MedicamentoControlComponent } from './medicamento-control/medicamento-control.component';

import { MedicamentoNewComponent } from './medicamento-new/medicamento-new.component';

import { MedicamentoEditComponent } from './medicamento-edit/medicamento-edit.component';

export const MedicamentoRouting: Routes = [
    {
        path: "",
        component: MedicamentoComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {
                path: "control",
                component: MedicamentoControlComponent,
                data: {
                    title: "Control de tipos de Medicamento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de Medicamentos' }
                    ]
                }
            },
            {
                path: "new",
                component: MedicamentoNewComponent,
                data: {
                    title: "Agregar tipo Medicamento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de Medicamento', url: '/system/Medicamento/control' },
                        { title: 'Alta' }
                    ]
                }
            },
            {
                path: "edit/:_idMedicamento",
                component: MedicamentoEditComponent,
                data: {
                    title: "Editar Medicamento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de Medicamento', url: '/system/Medicamento/control' },
                        { title: 'Editar' }
                    ]
                }
            }
        ]
    },

];
