import { Routes } from '@angular/router';
import { AnimalAlimentoComponent } from './animal-alimento/animal-alimento.component';
import { AnimalAlimentoControlComponent } from './animal-alimento-control/animal-alimento-control.component';
import { AnimalAlimentoNewComponent } from './animal-alimento-new/animal-alimento-new.component';
import { AnimalAlimentoEditComponent } from './animal-alimento-edit/animal-alimento-edit.component';

export const AnimalAlimentoRouting: Routes = [
    {
        path: "",
        component: AnimalAlimentoComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {
                path: "control",
                component: AnimalAlimentoControlComponent,
                data: {
                    title: "Control de tipos de AnimalAlimento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de AnimalAlimentos' }
                    ]
                }
            },
            {
                path: "new",
                component: AnimalAlimentoNewComponent,
                data: {
                    title: "Agregar tipo AnimalAlimento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de AnimalAlimento', url: '/system/AnimalAlimento/control' },
                        { title: 'Alta' }
                    ]
                }
            },
            {
                path: "edit/:_idAnimalAlimento",
                component: AnimalAlimentoEditComponent,
                data: {
                    title: "Editar AnimalAlimento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de AnimalAlimento', url: '/system/AnimalAlimento/control' },
                        { title: 'Editar' }
                    ]
                }
            }
        ]
    },

];
