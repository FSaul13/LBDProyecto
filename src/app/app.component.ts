import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { SessionService } from './system/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  param = {value: 'world'};

  constructor(
    translate: TranslateService,
    private srv_session:SessionService
  ) {
    var userLang = navigator.language;
    let language;
    if(userLang=='en'){
      language = 'en';
    }else if(userLang=='es'){
      language = 'es';
    }else if(userLang.indexOf('en-')!=-1){
      language = 'en';
    }else if(userLang.indexOf('es-')!=-1){
      language = 'es';
    }else{
      language = 'en';
    }
    this.srv_session.fnSetLanguage(language);

    translate.setDefaultLang('en');
    translate.use(language);
  }

  ngOnInit() {
  }
}
