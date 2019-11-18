import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SithecTableService {

  private $any_tableSpinner:BehaviorSubject<any> = new BehaviorSubject<any>({});
  _any_tableSpinner:Observable<any> = this.$any_tableSpinner.asObservable();

  constructor() { }

  fnOnTableSpinner(str_id):void{
    let data:any = this.$any_tableSpinner.getValue();
    data[str_id] = true;
  }

  fnOffTableSpinner(str_id):void{
    let data:any = this.$any_tableSpinner.getValue();
    data[str_id] = false;
  }
}
