import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class SintomaService {

  private $Sintoma_Array_recoverySintoma: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _SintomaArray_recoverySintoma: Observable<any[]> = this.$Sintoma_Array_recoverySintoma.asObservable();

  private $Sintoma_recoverySintoma: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
  _Sintoma_recoveryproductCode: Observable<any> = this.$Sintoma_recoverySintoma.asObservable();

  constructor(private api_call_Restfull: ApiCallService
  ) { }

  fnGetSintoma(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_SINTOMA)
        .then((res) => {
          this.$Sintoma_Array_recoverySintoma.next(res);
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }



  fnGetSintomaById(idSintoma: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([idSintoma], APIS_ENUM.GET_SINTOMA_BY_ID)
        .then((res: any) => {
          this.$Sintoma_recoverySintoma.next(res);

          resolve(res);
        })
        .catch((rej) => {
          this.$Sintoma_recoverySintoma.next({} as any);
          reject();
        })
    })

  }

  fnPostNewSintoma(newSintoma: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(newSintoma, APIS_ENUM.POST_NEW_SINTOMA)
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

  fnEditSintoma(editSintoma: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(editSintoma, APIS_ENUM.POST_EDIT_SINTOMA)
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

  fnPostDeleteSintoma(deleteSintoma: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(deleteSintoma, APIS_ENUM.POST_DELETE_SINTOMA)
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

  fnGetDeleteSintoma(): Promise<any> {
    this.fnResetSintoma();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_DELETE_SINTOMA)
        .then((res) => {
          this.$Sintoma_Array_recoverySintoma.next(res)
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }


  fnPostActivateSintoma(activateSintoma: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(activateSintoma, APIS_ENUM.POST_ACTIVATE_SINTOMA)
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
  fnResetSintomas() {
    this.$Sintoma_Array_recoverySintoma.next([]);
  }
  fnResetSintoma() {
    this.$Sintoma_recoverySintoma.next({} as any);
  }
}
