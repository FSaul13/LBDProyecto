import { Routes } from '@angular/router';

import { AlimentComponent } from './aliment/aliment.component';

import { AlimentControlComponent } from './aliment-control/aliment-control.component';

import { AlimentNewComponent } from './aliment-new/aliment-new.component';

import { AlimentEditComponent } from './aliment-edit/aliment-edit.component';

export const AlimentRouting: Routes = [
    {
        path: "",
        component: AlimentComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {
                path: "control",
                component: AlimentControlComponent,
                data: {
                    title: "Control de tipos de aliment",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de aliments' }
                    ]
                }
            },
            {
                path: "new",
                component: AlimentNewComponent,
                data: {
                    title: "Agregar tipo aliment",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de aliment', url: '/system/aliment/control' },
                        { title: 'Alta' }
                    ]
                }
            },
            {
                path: "edit/:_idAlimento",
                component: AlimentEditComponent,
                data: {
                    title: "Editar aliment",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de aliment', url: '/system/aliment/control' },
                        { title: 'Editar' }
                    ]
                }
            }
        ]
    },

];
