import { Routes } from '@angular/router';

import { DetalleTratamientoComponent } from './detalle-tratamiento/detalle-tratamiento.component';

import { DetalleTratamientoControlComponent } from './detalle-tratamiento-control/detalle-tratamiento-control.component';

import { DetalleTratamientoNewComponent } from './detalle-tratamiento-new/detalle-tratamiento-new.component';

import { DetalleTratamientoEditComponent } from './detalle-tratamiento-edit/detalle-tratamiento-edit.component';

export const DetalleTratamientoRouting: Routes = [
    {
        path: "",
        component: DetalleTratamientoComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {
                path: "control",
                component: DetalleTratamientoControlComponent,
                data: {
                    title: "Control de tipos de DetalleTratamiento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de DetalleTratamientos' }
                    ]
                }
            },
            {
                path: "new",
                component: DetalleTratamientoNewComponent,
                data: {
                    title: "Agregar tipo DetalleTratamiento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de DetalleTratamiento', url: '/system/detalle-tratamiento/control' },
                        { title: 'Alta' }
                    ]
                }
            },
            {
                path: "edit/:_id_tratamiento/:_id_medicamento",
                component: DetalleTratamientoEditComponent,
                data: {
                    title: "Editar DetalleTratamiento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de DetalleTratamiento', url: '/system/detalle-tratamiento/control' },
                        { title: 'Editar' }
                    ]
                }
            }
        ]
    },

];
