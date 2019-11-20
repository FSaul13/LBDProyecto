import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private $Animal_Array_recoveryAnimal: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _AnimalArray_recoveryAnimal: Observable<any[]> = this.$Animal_Array_recoveryAnimal.asObservable();

  private $Animal_recoveryAnimal: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
  _Animal_recoveryproductCode: Observable<any> = this.$Animal_recoveryAnimal.asObservable();

  constructor(private api_call_Restfull: ApiCallService
  ) { }

  fnGetAnimal(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_ANIMAL)
        .then((res) => {
          this.$Animal_Array_recoveryAnimal.next(res);
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }



  fnGetAnimalById(idAnimal: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([idAnimal], APIS_ENUM.GET_ANIMAL_BY_ID)
        .then((res) => {
          this.$Animal_recoveryAnimal.next(res);

          resolve(res);
        })
        .catch((rej) => {
          this.$Animal_recoveryAnimal.next({} as any);
          reject();
        })
    })

  }

  fnPostNewAnimal(newAnimal: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(newAnimal, APIS_ENUM.POST_NEW_ANIMAL)
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

  fnEditAnimal(editAnimal: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(editAnimal, APIS_ENUM.POST_EDIT_ANIMAL)
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

  fnPostDeleteAnimal(deleteAnimal: any): Promise<any> {

    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(deleteAnimal, APIS_ENUM.POST_DELETE_ANIMAL)
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

  fnGetDeleteAnimal(): Promise<any> {
    this.fnResetAnimal();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_DELETE_ANIMAL)
        .then((res) => {
          this.$Animal_Array_recoveryAnimal.next(res)
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }


  fnPostActivateAnimal(activateAnimal: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(activateAnimal, APIS_ENUM.POST_ACTIVATE_ANIMAL)
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
  fnResetAnimals() {
    this.$Animal_Array_recoveryAnimal.next([]);
  }
  fnResetAnimal() {
    this.$Animal_recoveryAnimal.next({} as any);
  }
}
