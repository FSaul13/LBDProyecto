import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { Response } from '../models/response';
import { APIS_ENUM } from '../enums/APIS.enum';

@Injectable({
  providedIn: 'root'
})
export class AnimalAlimentoService {

  private $Animal_Alimento_Array_recoveryAnimal_Alimento: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _Animal_AlimentoArray_recoveryAnimal_Alimento: Observable<any[]> = this.$Animal_Alimento_Array_recoveryAnimal_Alimento.asObservable();

  private $Animal_Alimento_recoveryAnimal_Alimento: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
  _Animal_Alimento_recoveryproductCode: Observable<any> = this.$Animal_Alimento_recoveryAnimal_Alimento.asObservable();

  constructor(private api_call_Restfull: ApiCallService
  ) { }

  fnGetAnimal_Alimento(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_ANIMAL_ALIMENTO)
        .then((res) => {
          this.$Animal_Alimento_Array_recoveryAnimal_Alimento.next(res);
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }



  fnGetAnimal_AlimentoById(idAnimal_Alimento: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([idAnimal_Alimento], APIS_ENUM.GET_ANIMAL_ALIMENTO_BY_ID)
        .then((res: any) => {
          this.$Animal_Alimento_recoveryAnimal_Alimento.next(res);

          resolve(res);
        })
        .catch((rej) => {
          this.$Animal_Alimento_recoveryAnimal_Alimento.next({} as any);
          reject();
        })
    })

  }

  fnPostNewAnimal_Alimento(newAnimal_Alimento: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(newAnimal_Alimento, APIS_ENUM.POST_NEW_ANIMAL_ALIMENTO)
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

  fnEditAnimal_Alimento(editAnimal_Alimento: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(editAnimal_Alimento, APIS_ENUM.POST_EDIT_ANIMAL_ALIMENTO)
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

  fnPostDeleteAnimal_Alimento(deleteAnimal_Alimento: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(deleteAnimal_Alimento, APIS_ENUM.POST_DELETE_ANIMAL_ALIMENTO)
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

  fnGetDeleteAnimal_Alimento(): Promise<any> {
    this.fnResetAnimal_Alimento();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_DELETE_ANIMAL_ALIMENTO)
        .then((res) => {
          this.$Animal_Alimento_Array_recoveryAnimal_Alimento.next(res)
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }


  fnPostActivateAnimal_Alimento(activateAnimal_Alimento: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(activateAnimal_Alimento, APIS_ENUM.POST_ACTIVATE_ANIMAL_ALIMENTO)
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
  fnResetAnimal_Alimentos() {
    this.$Animal_Alimento_Array_recoveryAnimal_Alimento.next([]);
  }
  fnResetAnimal_Alimento() {
    this.$Animal_Alimento_recoveryAnimal_Alimento.next({} as any);
  }
}
