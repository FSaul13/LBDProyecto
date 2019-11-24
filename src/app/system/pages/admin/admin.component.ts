import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { SidebarService } from '../../../services/sidebar.service';
import { ThemeService } from '../../../services/theme.service';
import { SessionService } from '../../services/session.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit, OnInit {

	public title = 'lucid';
	public isStopLoading: boolean = false;
	public showNotifMenu: boolean = false;
	public showToggleMenu: boolean = false;
	public navTab: string = "menu";
	public currentActiveMenu = "light";
	public currentActiveSubMenu;
	public themeClass: string = "theme-blue";
	public smallScreenMenu = "";
	//offcanvas-active

	sub_loggedSession: Subscription;

	constructor(
		private sidebarService: SidebarService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private themeService: ThemeService,
		private titleService: Title,
		private toastr: ToastrService,
		private sessionService_loggedSession: SessionService
	) {
		this.activatedRoute.url.subscribe(url => {
			this.isStopLoading = false;
			this.getActiveRoutes();
		});

		this.themeService.themeClassChange.subscribe(themeClass => {
			this.themeClass = themeClass;
		});

		this.themeService.smallScreenMenuShow.subscribe(showMenuClass => {
			this.smallScreenMenu = showMenuClass;
		});

		/*this.sub_loggedSession = this.sessionService_loggedSession._loginResponse_session.subscribe(res => {
				if (res) {
					console.log("Informacion recuperada")
				} else {
					if (SessionService.bln_recoverLogged) {
						if (SessionService.bln_notLoggedAccess) {
							this.toastr.warning("Debes iniciar sesión para ingresar a esta pagina", "Inicia sesión");
						} else {
							SessionService.bln_notLoggedAccess = true;
						}
	
						this.router.navigate(["system/authentication/page-login"])
					} else {
						console.log("Espera a recuperar informacion");
					}
				}
			})*/
	}

	ngOnInit() {
		let that = this;
		this.router.events
			.filter((event) => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map((route) => {
				that.themeService.hideMenu();
				while (route.firstChild) route = route.firstChild;
				return route;
			})
			.filter((route) => route.outlet === 'primary')
			.mergeMap((route) => route.data)
			.subscribe((event) => this.titleService.setTitle(event['title']));
	}

	ngOnDestroy() {
		if (this.sub_loggedSession) {
			this.sub_loggedSession.unsubscribe();
		}
	}

	toggleNotificationDropMenu() {
		this.showNotifMenu = !this.showNotifMenu;
	}

	toggleSettingDropMenu() {
		this.showToggleMenu = !this.showToggleMenu;
	}

	ngAfterViewInit() {
		let that = this;
		setTimeout(function () {
			that.isStopLoading = true;
		}, 1000);

	}

	getActiveRoutes() {
		let segments: Array<string> = this.router.url.split('/');
		this.currentActiveMenu = segments[2];
		this.currentActiveSubMenu = segments[3];
	}

	activeInactiveMenu($event) {
		console.log($event)
		if ($event.item && $event.item == this.currentActiveMenu) {
			this.currentActiveMenu = "";
		} else {
			this.currentActiveMenu = $event.item;
		}
	}

}
