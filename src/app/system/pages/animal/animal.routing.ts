import { Routes } from '@angular/router';

import { AnimalComponent } from './animal/animal.component';

import { AnimalControlComponent } from './animal-control/animal-control.component';

import { AnimalNewComponent } from './animal-new/animal-new.component';

import { AnimalEditComponent } from './animal-edit/animal-edit.component';

export const AnimalRouting: Routes = [
    {
        path: "",
        component: AnimalComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {
                path: "control",
                component: AnimalControlComponent,
                data: {
                    title: "Control de tipos de animal",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de animals' }
                    ]
                }
            },
            {
                path: "new",
                component: AnimalNewComponent,
                data: {
                    title: "Agregar tipo animal",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de animal', url: '/system/animal/control' },
                        { title: 'Alta' }
                    ]
                }
            },
            {
                path: "edit/:_idAnimal",
                component: AnimalEditComponent,
                data: {
                    title: "Editar animal",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de animal', url: '/system/animal/control' },
                        { title: 'Editar' }
                    ]
                }
            }
        ]
    },

];
