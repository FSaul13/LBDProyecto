import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Login } from '../models/login';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { LoginResponse } from '../models/loginResponse';
import { SessionService } from './session.service';
import { Response } from '../models/response';
import { User } from '../models/user';

@Injectable()
export class AuthenticacionService {

  configUrl = environment.ip;
  configFile = environment.files;

  constructor(
    private srvApiCall_restfull:ApiCallService,
    private srvSessionService_loggedSession:SessionService
  ) { 
    
  }

  fnLogin(login_userData:Login):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.srvApiCall_restfull.fnPostPromise(login_userData,APIS_ENUM.POST_LOGIN)
      .then((res:LoginResponse)=>{
        if(res._Success){
          SessionService.bln_recoverLogged = true;
          this.srvSessionService_loggedSession.fnSetSession(res);
          resolve();
        }else{
          reject(res._Message)
        }
        
      })
      .catch(rej=>{
        reject("Error en la conexion con el servidor");
      })
    });
  }

  fnLogout():Promise<any>{
    return new Promise((resolve,reject)=>{
      this.srvApiCall_restfull.fnPostPromise({},APIS_ENUM.POST_LOGOUT)
      .then((res:Response)=>{
        if(res._success){
          this.srvSessionService_loggedSession.fnLogout();
          resolve();
        }else{
          reject();
        } 
      })
      .catch(rej=>{
        reject()
      })
    });
  }

  fnResetPassword(user_resetPassword:User):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.srvApiCall_restfull.fnPostPromise(user_resetPassword,APIS_ENUM.POST_RESET_USER_PASSWORD)
      .then((res:Response)=>{
        if(res._success){
          resolve(res._message);
        }else{
          reject(res._message);
        }
      })
      .catch(rej=>{
        reject("Error de conexion con el servidor");
      });
    });
  }

}
