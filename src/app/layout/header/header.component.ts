import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';
import { SessionService } from '../../system/services/session.service';
import { AuthenticacionService } from '../../system/services/authenticacion.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {

	// Properties

	@Input() showNotifMenu: boolean = false;
	@Input() showToggleMenu: boolean = false;
	@Output() toggleSettingDropMenuEvent = new EventEmitter();
	@Output() toggleNotificationDropMenuEvent = new EventEmitter();

	constructor(
		private config: NgbDropdownConfig, 
		private themeService: ThemeService,
		private authenticationService_apis:AuthenticacionService
		) {
		config.placement = 'bottom-right';
	}

	ngOnInit() {
	}

	toggleSettingDropMenu() {
		this.toggleSettingDropMenuEvent.emit();
	}

	toggleNotificationDropMenu() {
		this.toggleNotificationDropMenuEvent.emit();
	}

	toggleSideMenu(){
		this.themeService.showHideMenu();
	}

	fnLogout():void{
		this.authenticationService_apis.fnLogout()
		.then(()=>{
			console.log("Salir")
		})
		.catch(()=>{
			console.log("Error")
		})
	}

}
