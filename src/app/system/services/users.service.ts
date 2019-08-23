import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { APIS_ENUM } from '../enums/APIS.enum';
import { UserList } from '../models/list/userList';
import { Response } from '../models/response';

@Injectable()
export class UsersService {

  private $users_recoverUsers:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  _users_recoverUsers:Observable<User[]> = this.$users_recoverUsers.asObservable();

  private $user_recoverUser:BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  _user_recoverUser:Observable<User> = this.$user_recoverUser.asObservable();

  constructor(
    private apiCall_restfull:ApiCallService
  ) { }

  fnResetUsersArray():void{
    this.$users_recoverUsers.next([]);
  }

  fnResetUser():void{
    this.$user_recoverUser.next({} as User);
  }

  fnGetUsers():Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCall_restfull.fnGetPromise([],APIS_ENUM.GET_USERS)
      .then((res:UserList)=>{
        console.log(res);
        this.$users_recoverUsers.next(res._usuarios)
        resolve();
      })
      .catch(rej=>{
        console.log(rej);
        reject("Error de conexion con el servidor");
      })
    });
  }

  fnPostCreateUser(user_new:User):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCall_restfull.fnPostPromise(user_new,APIS_ENUM.POST_NEW_USER)
      .then((res:Response)=>{
        if(res._success){
          resolve(res._message);
        }else{
          reject(res._message);
        }
      })
      .catch(rej=>{
        reject("Error de conexion con el servidor");
      })
    });
  }
  
  fnPostEditUser(user_edit:User):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCall_restfull.fnPostPromise(user_edit,APIS_ENUM.POST_EDIT_USER)
      .then((res:Response)=>{
        if(res._success){
          resolve(res._message);
        }else{
          reject(res._message);
        }
      })
      .catch(rej=>{
        reject("Error de conexion con el servidor");
      })
    });
  }

  fnGetUser(num_idUser:number):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCall_restfull.fnGetPromise([num_idUser],APIS_ENUM.GET_USER_BY_ID)
      .then((res:User)=>{
        if(res._idUsuario == 0){
          this.$user_recoverUser.next({} as User)
          reject();
        }else{
          this.$user_recoverUser.next(res)
          resolve();
        }
      })
      .catch(rej=>{
        this.$user_recoverUser.next({} as User)
        reject();
      })
    })
  }

  fnPostDeleteUser(user_delete:User):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCall_restfull.fnPostPromise(user_delete,APIS_ENUM.POST_DELETE_USER)
      .then((res:Response)=>{
        if(res._success){
          resolve(res._message)
        }else{
          reject(res._message)
        }
      })
      .catch(rej=>{
        reject("Error de conexion con el servidor")
      })
    });
  }

  fnChangeUserPassword(user_changePassword:User):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCall_restfull.fnPostPromise(user_changePassword,APIS_ENUM.POST_CHANGE_USER_PASSWORD_ADMIN)
      .then((res:Response)=>{
        if(res._success){
          resolve(res._message);
        }else{
          reject(res._message)
        }
      })
      .catch(rej=>{
        reject("Error de conexion con el servidor");
      });
    });
  }
}
