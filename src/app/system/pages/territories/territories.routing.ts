import { Routes } from '@angular/router';
import { TerritoriesComponent } from './territories/territories.component';
import { TerritoriesControlComponent } from './territories-control/territories-control.component';
import { TerritoriesNewComponent } from './territories-new/territories-new.component';
import { TerritoriesEditComponent } from './territories-edit/territories-edit.component';

export const TerritoresRouting: Routes = [
    {
        path: "",
        component: TerritoriesComponent,
        children: [
            { path: '', redirectTo: 'control', pathMatch: 'full' },
            {  
                path: "control",
                component: TerritoriesControlComponent,
                data: {
                    title: "Control de territories"
                }
            },
            {
                path: "new",
                component: TerritoriesNewComponent,
                data: {
                    title: "Agregar territorio"
                }
            },
            {
                path: "edit/:id_territorie",
                component: TerritoriesEditComponent,
                data: {
                    title: "Editar territories"
                }
            }
        ]
    },
    
];
