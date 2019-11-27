import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class DetalleTratamientoService {


  private $DetalleTratamiento_Array_recoveryDetalleTratamiento: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _DetalleTratamientoArray_recoveryDetalleTratamiento: Observable<any[]> = this.$DetalleTratamiento_Array_recoveryDetalleTratamiento.asObservable();

  private $DetalleTratamiento_recoveryDetalleTratamiento: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
  _DetalleTratamiento_recoveryproductCode: Observable<any> = this.$DetalleTratamiento_recoveryDetalleTratamiento.asObservable();

  constructor(private api_call_Restfull: ApiCallService
  ) { }

  fnGetDetalleTratamiento(): Promise<any> {
    let parametros: any = {
      _accion: "obtenerDetalleTratamientos"
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_DETALLE_TRATAMIENTO)
        .then((res) => {
          console.log(res);
          this.$DetalleTratamiento_Array_recoveryDetalleTratamiento.next(res);
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }



  fnGetDetalleTratamientoById(id_tratamiento: number, id_medicamento: number): Promise<any> {
    let valores: any = {
      _id_tratamiento: id_tratamiento,
      _id_medicamento: id_medicamento
    }
    let parametros: any = {
      _accion: "obtenerId",
      _valor: valores
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_DETALLE_TRATAMIENTO)
        .then((res) => {
          this.$DetalleTratamiento_recoveryDetalleTratamiento.next(res);

          resolve(res);
        })
        .catch((rej) => {
          this.$DetalleTratamiento_recoveryDetalleTratamiento.next({} as any);
          reject();
        })
    })

  }

  fnPostNewDetalleTratamiento(newDetalleTratamiento: any): Promise<any> {
    let parametros: any = {
      _accion: "nuevo",
      _valor: newDetalleTratamiento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_DETALLE_TRATAMIENTO)
        .then((res: Response) => {
          console.log(res);
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

  fnEditDetalleTratamiento(editDetalleTratamiento: any): Promise<any> {
    let parametros: any = {
      _accion: "editar",
      _valor: editDetalleTratamiento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_DETALLE_TRATAMIENTO)
        .then((res: Response) => {
          console.log(res);
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

  fnPostDeleteDetalleTratamiento(deleteDetalleTratamiento: any): Promise<any> {
    console.log(deleteDetalleTratamiento)

    let parametros: any = {
      _accion: "eliminar",
      _valor: deleteDetalleTratamiento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_DETALLE_TRATAMIENTO)
        .then((res: Response) => {
          console.log(res);
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

  fnGetDeleteDetalleTratamiento(): Promise<any> {
    this.fnResetDetalleTratamiento();
    return new Promise((resolve, reject) => {

      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_DETALLE_TRATAMIENTO)
        .then((res) => {
          this.$DetalleTratamiento_Array_recoveryDetalleTratamiento.next(res)
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }


  fnPostActivateDetalleTratamiento(activateDetalleTratamiento: any): Promise<any> {
    return new Promise((resolve, reject) => {

      this.api_call_Restfull.fnPostPromise(activateDetalleTratamiento, APIS_ENUM.GET_DETALLE_TRATAMIENTO)

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
  fnResetDetalleTratamientos() {
    this.$DetalleTratamiento_Array_recoveryDetalleTratamiento.next([]);
  }
  fnResetDetalleTratamiento() {
    this.$DetalleTratamiento_recoveryDetalleTratamiento.next({} as any);
  }
}
