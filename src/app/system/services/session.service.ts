import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/loginResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticacionService } from './authenticacion.service';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';

@Injectable()
export class SessionService {

  private str_aplicationLanguage: string = 'en';

  private $loginResponse_session:BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(null);
  _loginResponse_session:Observable<LoginResponse> = this.$loginResponse_session.asObservable();

  static bln_recoverLogged:boolean;
  static bln_initSessionService:boolean;
  static bln_notLoggedAccess:boolean = true;

  constructor(
    private srvApiCall_restfull:ApiCallService
  ) { 
    if(SessionService.bln_initSessionService){
      return;
    }
    SessionService.bln_initSessionService = true;
    if(localStorage.getItem("sessionToken")){
      this.fnRecoverLoggedData()
    }else{
      SessionService.bln_recoverLogged = true;
    }
  }

  fnRecoverLoggedData():void{
    let str_token:string = localStorage.getItem("sessionToken");
      this.srvApiCall_restfull.fnGetPromise([str_token],APIS_ENUM.GET_DATA_LOGGED_USER)
      .then((res:LoginResponse)=>{
        if(res._Success){
          SessionService.bln_recoverLogged = true;
          this.fnSetSession(res);
        }
      })
      .catch(rej=>{
        console.log(rej)
      })
  }

  fnSetSession(loginResponse_session:LoginResponse):void{
    localStorage.removeItem("sessionToken");
    localStorage.setItem("sessionToken",loginResponse_session._Token)
    this.$loginResponse_session.next(loginResponse_session);
  }

  fnLogout(){
    SessionService.bln_notLoggedAccess = false;
    localStorage.removeItem("sessionToken");
    this.$loginResponse_session.next(null);
  }

  fnSetLanguage(str_browserLanguage): void {
    this.str_aplicationLanguage = str_browserLanguage;
  }

  fnGetLanguage(): string {
    return this.str_aplicationLanguage;
  }

  fnSaveSession(loginResponse_userData: LoginResponse): void {
    let str_loginResponse = JSON.stringify(loginResponse_userData)
    str_loginResponse = btoa(str_loginResponse)
    localStorage.setItem('str_loginResponse', str_loginResponse);
  }

  fnGetCurrentSession(): LoginResponse {
    var str_loginResponse = localStorage.getItem('str_loginResponse');
    if (!str_loginResponse) {
      return null;
    }
    str_loginResponse = atob(str_loginResponse)


    return JSON.parse(str_loginResponse) as LoginResponse;
  }
}
