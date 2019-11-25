import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  private $Enfermedad_Array_recoveryEnfermedad: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _EnfermedadArray_recoveryEnfermedad: Observable<any[]> = this.$Enfermedad_Array_recoveryEnfermedad.asObservable();

  private $Enfermedad_recoveryEnfermedad: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
  _Enfermedad_recoveryproductCode: Observable<any> = this.$Enfermedad_recoveryEnfermedad.asObservable();

  constructor(private api_call_Restfull: ApiCallService
  ) { }

  fnGetEnfermedad(): Promise<any> {
    let parametros: any = {
      _accion: "obtenerEnfermedades"
    }

    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_ENFERMEDAD)
        .then((res) => {
          this.$Enfermedad_Array_recoveryEnfermedad.next(res);
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }



  fnGetEnfermedadById(idEnfermedad: number): Promise<any> {
    let parametros: any = {
      _accion: "obtenerId",
      _valor: idEnfermedad
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_ENFERMEDAD_BY_ID)
        .then((res: any) => {
          this.$Enfermedad_recoveryEnfermedad.next(res);

          resolve(res);
        })
        .catch((rej) => {
          this.$Enfermedad_recoveryEnfermedad.next({} as any);
          reject();
        })
    })

  }

  fnPostNewEnfermedad(newEnfermedad: any): Promise<any> {
    let parametros: any = {
      _accion: "nuevo",
      _valor: newEnfermedad
    }

    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.POST_NEW_ENFERMEDAD)
        .then((res: Response) => {
          if (res._success) {
            resolve(res._message);
          }
          else {
            reject(res._message);
          }
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }

  fnEditEnfermedad(editEnfermedad: any): Promise<any> {
    let parametros: any = {
      _accion: "editar",
      _valor: editEnfermedad
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.POST_EDIT_ENFERMEDAD)
        .then((res: Response) => {
          if (res._success) {
            resolve(res._message);
          }
          else {
            reject(res._message);
          }
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }

  fnPostDeleteEnfermedad(deleteEnfermedad: any): Promise<any> {
    let parametros: any = {
      _accion: "eliminar",
      _valor: deleteEnfermedad
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.POST_DELETE_ENFERMEDAD)
        .then((res: Response) => {
          if (res._success) {
            resolve(res._message);
          }
          else {
            reject(res._message);
          }
        })
        .catch(rej => {
          reject("Error de conexion")
        });

    })
  }

  fnGetDeleteEnfermedad(): Promise<any> {
    this.fnResetEnfermedad();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_DELETE_ENFERMEDAD)
        .then((res) => {
          this.$Enfermedad_Array_recoveryEnfermedad.next(res)
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }


  fnPostActivateEnfermedad(activateEnfermedad: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(activateEnfermedad, APIS_ENUM.POST_ACTIVATE_ENFERMEDAD)
        .then((res: Response) => {
          if (res._success) {
            resolve(res._message);
          }
          else {
            reject(res._message);
          }
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }
  fnResetEnfermedads() {
    this.$Enfermedad_Array_recoveryEnfermedad.next([]);
  }
  fnResetEnfermedad() {
    this.$Enfermedad_recoveryEnfermedad.next({} as any);
  }
}
