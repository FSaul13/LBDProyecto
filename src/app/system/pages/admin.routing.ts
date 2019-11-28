import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';
import { ConsultaAlimentosComponent } from './consulta-alimentos/consulta-alimentos/consulta-alimentos.component';
import { ConsultaEnfermedadAnimalComponent } from './consulta-enfermedadAnimal/consulta-enfermedad-animal/consulta-enfermedad-animal.component';
import { ConsultaMedicamentosTratamientoComponent } from './consulta-medicamentosTratamiento/consulta-medicamentos-tratamiento/consulta-medicamentos-tratamiento.component';
import { ConsultaTratamientoEnfermedadComponent } from './consulta-tratamientoEnfermedad/consulta-tratamiento-enfermedad/consulta-tratamiento-enfermedad.component';
import { ConsultaSintomasEnfermedadComponent } from './consulta-sintomasEnfermedad/consulta-sintomas-enfermedad/consulta-sintomas-enfermedad.component';
import { ConsultaEnfermedadSintomaComponent } from './consulta-enfermedadSintoma/consulta-enfermedad-sintoma/consulta-enfermedad-sintoma.component';
import { ConsultaEnfermedadPeligrosasComponent } from './consulta-enfermedadPeligrosas/consulta-enfermedad-peligrosas/consulta-enfermedad-peligrosas.component';

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
                path: "detalle-tratamiento",
                loadChildren: "../pages/detalle-tratamiento/detalle-tratamiento.module#DetalleTratamientoModule"
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
            {
                path: "consulta-alimentos",
                component: ConsultaAlimentosComponent,
                // loadChildren: "../pages/consulta-alimentos/consulta-alimentos.module#ConsultaAlimentosModule"
            },
            {
                path: "consulta-enfermedadSintoma",
                component: ConsultaEnfermedadSintomaComponent,

            },

            {
                path: "consulta-enfermedad",
                component: ConsultaEnfermedadAnimalComponent,
                // loadChildren: "../pages/consulta-alimentos/consulta-alimentos.module#ConsultaAlimentosModule"
            },

            {
                path: "consulta-medicamentos",
                component: ConsultaMedicamentosTratamientoComponent,
                // loadChildren: "../pages/consulta-alimentos/consulta-alimentos.module#ConsultaAlimentosModule"
            },

            {
                path: "consulta-tratamientos",
                component: ConsultaTratamientoEnfermedadComponent,
                // loadChildren: "../pages/consulta-alimentos/consulta-alimentos.module#ConsultaAlimentosModule"
            },

            {
                path: "consulta-sintomas",
                component: ConsultaSintomasEnfermedadComponent,
                // loadChildren: "../pages/consulta-alimentos/consulta-alimentos.module#ConsultaAlimentosModule"
            },
            {
                path: "enfermedades-peligrosas",
                component: ConsultaEnfermedadPeligrosasComponent,
                // loadChildren: "../pages/consulta-alimentos/consulta-alimentos.module#ConsultaAlimentosModule"
            },


        ]
    },

];

export const routing = RouterModule.forChild(routes);