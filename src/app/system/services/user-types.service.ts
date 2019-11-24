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
    let parametros: any = {
      _accion: "obtenerTodos"
    }
    return new Promise((resolve, reject) => {
      this.apiCallService_restfull.fnPostPromise(parametros, APIS_ENUM.GET_PRUEBA)
        .then((res) => {
          //console.log(res.data)
          this.$userTypesArray_recoverUserTypes.next(res);
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion con el servidor");
        })
    })
  }

  fnPostNewUserType(userType_new: TypeUser): Promise<any> {
    let parametros: any = {
      _accion: "nuevo",
      _valor: userType_new
    }
    return new Promise((resolve, reject) => {
      this.apiCallService_restfull.fnPostPromise(parametros, APIS_ENUM.POST_PRUEBA)
        .then((res: Response) => {
          if (res._success) {
            console.log(res)
            resolve(res._message);
          } else {
            console.log(res)
            reject(res._message);
          }
        })
        .catch(rej => {
          reject("Error en la conexion con el servidor");
        })
    });
  }

  fnPostEditUserType(userType_new: TypeUser): Promise<any> {
    let parametros: any = {
      _accion: "editar",
      _valor: userType_new
    }
    return new Promise((resolve, reject) => {
      this.apiCallService_restfull.fnPostPromise(parametros, APIS_ENUM.POST_EDIT_USER_TYPE)
        .then((res: Response) => {
          if (res._success) {
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
    console.log("valor" + num_idUserType)
    let parametros: any = {
      _accion: "obtenerId",
      _valor: num_idUserType
    }
    return new Promise((resolve, reject) => {
      this.apiCallService_restfull.fnPostPromise(parametros, APIS_ENUM.GET_USER_TYPE_BY_ID)
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

  fnPostDeleteUserType(user_delete: TypeUser): Promise<any> {
    let parametros: any = {
      _accion: "eliminar",
      _valor: user_delete
    }
    return new Promise((resolve, reject) => {
      this.apiCallService_restfull.fnPostPromise(parametros, APIS_ENUM.POST_DELETE_USER_TYPE)
        .then((res: Response) => {
          if (res._success) {
            resolve(res._message)
          } else {
            reject(res._message)
          }
        })
        .catch(rej => {
          reject("Error de conexion con el servidor")
        })
    });
  }
}
