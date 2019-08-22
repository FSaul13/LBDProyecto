import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../models/state';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { StateList } from '../models/list/stateList';

@Injectable()
export class StatesService {
  private $StateArray_recoveryStates: BehaviorSubject<State[]> = new BehaviorSubject<State[]>([]);
  _stateArray_recoveryStates: Observable<State[]> = this.$StateArray_recoveryStates.asObservable();


  constructor(private api_call_Restfull: ApiCallService) {
    //this.fnGetStates();
   }

  fnGetStates(num_idState:number): Promise<any> {
    
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([num_idState], APIS_ENUM.GET_STATES)
        .then((res:StateList) => {
          this.$StateArray_recoveryStates.next(res._estados)
          resolve();
        })
        .catch(rej => {
          reject('Error de conexion');
        })
    })
  }
}
