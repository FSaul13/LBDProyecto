import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {


  private $Tratamiento_Array_recoveryTratamiento: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _TratamientoArray_recoveryTratamiento: Observable<any[]> = this.$Tratamiento_Array_recoveryTratamiento.asObservable();

  private $Tratamiento_recoveryTratamiento: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
  _Tratamiento_recoveryproductCode: Observable<any> = this.$Tratamiento_recoveryTratamiento.asObservable();

  constructor(private api_call_Restfull: ApiCallService
  ) { }

  fnGetTratamiento(): Promise<any> {
    let parametros: any = {
      _accion: "obtenerTratamiento"
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_TRATAMIENTO)
        .then((res) => {
          console.log(res);
          this.$Tratamiento_Array_recoveryTratamiento.next(res);
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }



  fnGetTratamientoById(idTratamiento: number): Promise<any> {
    let parametros: any = {
      _accion: "obtenerId",
      _valor: idTratamiento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_TRATAMIENTO_BY_ID)
        .then((res: any) => {
          this.$Tratamiento_recoveryTratamiento.next(res);

          resolve(res);
        })
        .catch((rej) => {
          this.$Tratamiento_recoveryTratamiento.next({} as any);
          reject();
        })
    })

  }

  fnPostNewTratamiento(newTratamiento: any): Promise<any> {
    let parametros: any = {
      _accion: "nuevo",
      _valor: newTratamiento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.POST_NEW_TRATAMIENTO)
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

  fnEditTratamiento(editTratamiento: any): Promise<any> {
    let parametros: any = {
      _accion: "editar",
      _valor: editTratamiento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.POST_EDIT_TRATAMIENTO)
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

  fnPostDeleteTratamiento(deleteTratamiento: any): Promise<any> {
    let parametros: any = {
      _accion: "eliminar",
      _valor: deleteTratamiento
    }

    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.POST_DELETE_TRATAMIENTO)
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

  fnGetDeleteTratamiento(): Promise<any> {
    this.fnResetTratamiento();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_DELETE_TRATAMIENTO)
        .then((res) => {
          this.$Tratamiento_Array_recoveryTratamiento.next(res)
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }


  fnPostActivateTratamiento(activateTratamiento: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(activateTratamiento, APIS_ENUM.POST_ACTIVATE_TRATAMIENTO)
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
  fnResetTratamientos() {
    this.$Tratamiento_Array_recoveryTratamiento.next([]);
  }
  fnResetTratamiento() {
    this.$Tratamiento_recoveryTratamiento.next({} as any);
  }
}
