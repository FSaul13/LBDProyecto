import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from 'ng-fullcalendar';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../../admin/admin/admin.component';
import { UsersService } from '../services/users.service';
import { UserTypesService } from '../services/user-types.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPInterceptorService } from '../services/http.interceptor';
import { LayoutModule } from '../../layout/layout.module';
import { AlimentService } from '../services/aliment.service';
import { AnimalService } from '../services/animal.service';
import { routing } from '../../admin/admin.routing';
import { FormModule } from '../components/form/form.module';
import { SithecSuiteModule } from '../components/sithec-suite/sithec-tools-suite.module';
import { IndexComponent } from './index/index.component';






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
		FormModule,
		SithecSuiteModule

	],
	declarations: [
		AdminComponent,
		IndexComponent

	],
	providers: [
		UsersService,
		UserTypesService,
		AlimentService,
		AnimalService,
		{ provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true }
	]
})
export class AdminModule { }
