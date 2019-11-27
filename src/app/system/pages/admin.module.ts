import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { routing } from './admin.routing';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from 'ng-fullcalendar';

import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../../layout/layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPInterceptorService } from '../services/http.interceptor';
import { UsersService } from '../services/users.service';
import { UserTypesService } from '../services/user-types.service';
import { TratamientoService } from '../services/tratamiento.service';
import { ConsultaAlimentosComponent } from './consulta-alimentos/consulta-alimentos/consulta-alimentos.component';
import { ConsultaSintomasEnfermedadComponent } from './consulta-sintomasEnfermedad/consulta-sintomas-enfermedad/consulta-sintomas-enfermedad.component';
import { ConsultaTratamientoEnfermedadComponent } from './consulta-tratamientoEnfermedad/consulta-tratamiento-enfermedad/consulta-tratamiento-enfermedad.component';
import { ConsultaEnfermedadSintomaComponent } from './consulta-enfermedadSintoma/consulta-enfermedad-sintoma/consulta-enfermedad-sintoma.component';
import { ConsultaEnfermedadAnimalComponent } from './consulta-enfermedadAnimal/consulta-enfermedad-animal/consulta-enfermedad-animal.component';
import { ConsultaMedicamentosTratamientoComponent } from './consulta-medicamentosTratamiento/consulta-medicamentos-tratamiento/consulta-medicamentos-tratamiento.component';

@NgModule({
	imports: [
		CommonModule,
		routing,
		ApplicationModule,
		NgxEchartsModule,
		RichTextEditorAllModule,
		NgbModule,
		FullCalendarModule,
		RouterModule,
		LayoutModule,

	],
	declarations: [
		AdminComponent,
		IndexComponent,
		ConsultaAlimentosComponent,
		ConsultaSintomasEnfermedadComponent,
		ConsultaTratamientoEnfermedadComponent,
		ConsultaEnfermedadSintomaComponent,
		ConsultaEnfermedadAnimalComponent,
		ConsultaMedicamentosTratamientoComponent

	],
	providers: [
		UsersService,
		UserTypesService,
		TratamientoService,
		{ provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true }
	]
})
export class AdminModule { }