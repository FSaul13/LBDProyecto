import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		NgbModule,
		RouterModule,
		TranslateModule.forChild()
	],
	declarations: [HeaderComponent, SidebarComponent, PageLoaderComponent],
	exports: [HeaderComponent, SidebarComponent, PageLoaderComponent]
})
export class LayoutModule { }
