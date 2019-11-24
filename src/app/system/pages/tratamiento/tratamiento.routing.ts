import { Routes } from '@angular/router';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { TratamientoControlComponent } from './tratamiento-control/tratamiento-control.component';
import { TratamientoNewComponent } from './tratamiento-new/tratamiento-new.component';
import { TratamientoEditComponent } from './tratamiento-edit/tratamiento-edit.component';

export const TratamientoRouting: Routes = [
    {
        path: "",
        component: TratamientoComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {
                path: "control",
                component: TratamientoControlComponent,
                data: {
                    title: "Control de tipos de Tratamiento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de Tratamientos' }
                    ]
                }
            },
            {
                path: "new",
                component: TratamientoNewComponent,
                data: {
                    title: "Agregar tipo Tratamiento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de Tratamiento', url: '/system/Tratamiento/control' },
                        { title: 'Alta' }
                    ]
                }
            },
            {
                path: "edit/:_idTratamiento",
                component: TratamientoEditComponent,
                data: {
                    title: "Editar Tratamiento",
                    urls: [
                        { title: 'Home', url: '/system/home' },
                        { title: 'Control de tipos de Tratamiento', url: '/system/Tratamiento/control' },
                        { title: 'Editar' }
                    ]
                }
            }
        ]
    },

];
