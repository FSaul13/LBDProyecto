import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TypeUser } from '../models/typeUser';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { TypeUserList } from '../models/list/typeUserList';
import { Response } from '../models/response';
import { User } from '../models/user';

@Injectable()
export class UserTypesService {

  private $userTypesArray_recoverUserTypes: BehaviorSubject<TypeUser[]> = new BehaviorSubject<TypeUser[]>([]);
  _userTypesArray_recoverUserTypes: Observable<TypeUser[]> = this.$userTypesArray_recoverUserTypes.asObservable();

  private $userType_recoverUserType: BehaviorSubject<TypeUser> = new BehaviorSubject<TypeUser>({} as TypeUser);
  _userType_recoverUserType: Observable<TypeUser> = this.$userType_recoverUserType.asObservable();

  constructor(
    private apiCallService_restfull: ApiCallService
  ) { }

  fnResetUserTypesArray(): void {
    this.$userTypesArray_recoverUserTypes.next([]);
  }

  fnResetUserType(): void {
    this.$userType_recoverUserType.next({} as TypeUser);
  }

  fnGetUserTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiCallService_restfull.fnGetPromise([], APIS_ENUM.GET_USER_TYPE)
        .then((res: TypeUserList) => {
          console.log(res)
          this.$userTypesArray_recoverUserTypes.next(res._tiposUsuarios);
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion con el servidor");
        })
    })
  }

  fnPostNewUserType(userType_new: TypeUser): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiCallService_restfull.fnPostPromise(userType_new, APIS_ENUM.POST_NEW_USER_TYPE)
        .then((res: Response) => {
          if (res._message) {
            resolve(res._message);
          } else {
            reject(res._message);
          }
        })
        .catch(rej => {
          reject("Error en la conexion con el servidor");
        })
    });
  }

  fnPostEditUserType(userType_new: TypeUser): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiCallService_restfull.fnPostPromise(userType_new, APIS_ENUM.POST_EDIT_USER_TYPE)
        .then((res: Response) => {
          if (res._message) {
            resolve(res._message);
          } else {
            reject(res._message);
          }
        })
        .catch(rej => {
          reject("Error en la conexion con el servidor");
        })
    });
  }

  fnGetUserTypeById(num_idUserType: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiCallService_restfull.fnGetPromise([num_idUserType], APIS_ENUM.GET_USER_TYPE_BY_ID)
        .then((res: TypeUser) => {
          if (res._idTipoUsuario == 0) {
            this.$userType_recoverUserType.next({} as TypeUser)
            reject("Usuario no encontrado");
          } else {
            this.$userType_recoverUserType.next(res)
            resolve();
          }
        })
        .catch(rej => {
          this.$userType_recoverUserType.next({} as TypeUser)
          reject("Error en la conexion con el servidor");
        });
    });
  }

  fnPostDeleteUserType(user_delete:TypeUser):Promise<any>{
    return new Promise((resolve,reject)=>{
      this.apiCallService_restfull.fnPostPromise(user_delete,APIS_ENUM.POST_DELETE_USER_TYPE)
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
}
