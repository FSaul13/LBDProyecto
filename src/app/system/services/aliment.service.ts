import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  private $Aliment_Array_recoveryAliment: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _AlimentArray_recoveryAliment: Observable<any[]> = this.$Aliment_Array_recoveryAliment.asObservable();

  private $Aliment_recoveryAliment: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
  _Aliment_recoveryproductCode: Observable<any> = this.$Aliment_recoveryAliment.asObservable();

  constructor(private api_call_Restfull: ApiCallService
  ) { }

  fnGetAliment(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_ALIMENT)
        .then((res) => {
          this.$Aliment_Array_recoveryAliment.next(res);
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }



  fnGetAlimentById(idAliment: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([idAliment], APIS_ENUM.GET_ALIMENT_BY_ID)
        .then((res: any) => {
          this.$Aliment_recoveryAliment.next(res);

          resolve(res);
        })
        .catch((rej) => {
          this.$Aliment_recoveryAliment.next({} as any);
          reject();
        })
    })

  }

  fnPostNewAliment(newAliment: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(newAliment, APIS_ENUM.POST_NEW_ALIMENT)
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

  fnEditAliment(editAliment: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(editAliment, APIS_ENUM.POST_EDIT_ALIMENT)
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

  fnPostDeleteAliment(deleteAliment: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(deleteAliment, APIS_ENUM.POST_DELETE_ALIMENT)
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

  fnGetDeleteAliment(): Promise<any> {
    this.fnResetAliment();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_DELETE_ALIMENT)
        .then((res) => {
          this.$Aliment_Array_recoveryAliment.next(res)
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }


  fnPostActivateAliment(activateAliment: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(activateAliment, APIS_ENUM.POST_ACTIVATE_ALIMENT)
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
  fnResetAliments() {
    this.$Aliment_Array_recoveryAliment.next([]);
  }
  fnResetAliment() {
    this.$Aliment_recoveryAliment.next({} as any);
  }
}
