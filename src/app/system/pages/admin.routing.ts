import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            {
                path: 'dashboard',
                children: [
                    { path: '', redirectTo: 'index', pathMatch: 'full' },
                    { path: 'index', component: IndexComponent, data: { title: ':: Lucid Angular :: Dashboard :: Analytical ::' } }
                ]
            },
            {
                path: "users",
                loadChildren: "../pages/users/users.module#UsersModule"
            },
            {
                path: "user-types",
                loadChildren: "../pages/user-types/user-types.module#UserTypesModule"
            },
            {
                path: "aliment",
                loadChildren: "../pages/aliment/aliment.module#AlimentModule"
            },
            {
                path: "animal",
                loadChildren: "../pages/animal/animal.module#AnimalModule"
            },
            {
                path: "medicamento",
                loadChildren: "../pages/medicamento/medicamento.module#MedicamentoModule"
            },
            {
                path: "enfermedad",
                loadChildren: "../pages/enfermedad/enfermedad.module#EnfermedadModule"
            },
            {
                path: "animal-alimento",
                loadChildren: "../pages/animal-alimento/animal-alimento.module#AnimalAlimentoModule"
            },
            {
                path: "tratamiento",
                loadChildren: "../pages/tratamiento/tratamiento.module#TratamientoModule"
            },
            {
                path: "sintoma",
                loadChildren: "../pages/sintoma/sintoma.module#SintomaModule"
            },

        ]
    },

];

export const routing = RouterModule.forChild(routes);