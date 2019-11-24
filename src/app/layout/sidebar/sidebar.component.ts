import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { AuthenticacionService } from '../../system/services/authenticacion.service';
import { SessionService } from '../../system/services/session.service';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	@Input() sidebarVisible: boolean = true;
	@Input() navTab: string = "menu";
	@Input() currentActiveMenu;
	@Input() currentActiveSubMenu;
	@Output() changeNavTabEvent = new EventEmitter();
	@Output() activeInactiveMenuEvent = new EventEmitter();
	public themeClass: string = "theme-blue";

	sub_session: Subscription;

	constructor(
		private themeService: ThemeService,
		private authenticationService_apis: AuthenticacionService,
		private sessionService_loggedSession: SessionService
	) {
		this.themeService.themeClassChange.subscribe(themeClass => {
			this.themeClass = themeClass;
		});
	}

	ngOnInit() {
		this.fnSubscribeToSession();
	}

	ngOnDestroy() {
		if (this.sub_session) {
			this.sub_session.unsubscribe();
		}
	}

	str_usuario: string = "";
	fnSubscribeToSession(): void {
		this.sub_session = this.sessionService_loggedSession._loginResponse_session.subscribe(res => {
			if (res) {
				this.str_usuario = res._Usuario._nombre + " " + res._Usuario._apellidos;
			}
		})
	}

	changeNavTab(tab: string) {
		this.navTab = tab;
	}

	activeInactiveMenu(menuItem: string) {
		this.activeInactiveMenuEvent.emit({ 'item': menuItem });
	}

	changeTheme(theme: string) {
		this.themeService.themeChange(theme);
	}

	fnLogout(): void {
		this.authenticationService_apis.fnLogout()
			.then(() => {
				console.log("Salir")
			})
			.catch(() => {
				console.log("Error")
			})
	}
}
