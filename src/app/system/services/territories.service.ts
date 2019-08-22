import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Territory } from '../models/territory';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';
import { TerritoryList } from '../models/list/territoryList';


@Injectable()
export class TerritoriesService {

  private $territoryArray_recoveryTerritories: BehaviorSubject<Territory[]> = new BehaviorSubject<Territory[]>([]);
  _territoryArray_recoveryTerritories: Observable<Territory[]> = this.$territoryArray_recoveryTerritories.asObservable();

  private $territory_recoverUserType: BehaviorSubject<Territory> = new BehaviorSubject<Territory>({} as Territory);
  _territory_recoverUserType: Observable<Territory> = this.$territory_recoverUserType.asObservable();

  constructor(private apicall_restfull: ApiCallService) { }

  fnGetTerritories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apicall_restfull.fnGetPromise([], APIS_ENUM.GET_TERRITORIES)
        .then((res:TerritoryList) => {
          console.log(res)
          this.$territoryArray_recoveryTerritories.next(res._territorios)
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        })
    })
  }

  fnPostnewTerritory(territory_new: Territory): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apicall_restfull.fnPostPromise(territory_new, APIS_ENUM.POST_NEW_TERRITORIES)
        .then((res: Response) => {
          if (res._success) {
            resolve(res._message)
          } else {
            reject(res._message)
          }
        })
        .catch(rej => {
          console.log(rej);
          reject("Error de conexion")
        })
    })

  }

  fnEditTerritory(territoryEdit: Territory): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apicall_restfull.fnPostPromise(territoryEdit, APIS_ENUM.POST_EDIT_TERRITORY)
        .then((res: Response) => {
          if (res._success) {
            resolve(res._message)
          } else {
            reject(res._message);
          }
        })
        .catch(rej => {
          console.log(rej);
          reject("Error de conexion");
        })
    })
  }
  fnGetTerritoryById(num_idTerritory: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apicall_restfull.fnGetPromise([num_idTerritory], APIS_ENUM.GET_TERRITORY_BY_ID)
        .then((res: Territory) => {
          this.$territory_recoverUserType.next(res)
          resolve();
        })
        .catch(rej => {
          this.$territory_recoverUserType.next({} as Territory)
          reject();
        });

    });

  }
  fnPostDeleteTerritory(territory_delete: Territory): Promise <any>{
    return new Promise((resolve,reject)=>{
     resolve();
    })
  }


}
