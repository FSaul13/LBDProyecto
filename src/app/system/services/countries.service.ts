import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from '../models/country';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';
import { CountryList } from '../models/list/countryList';

@Injectable()
export class CountriesService {
  private $CountryArray_recoverycountry: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  _countryArray_recoveryCountry: Observable<Country[]> = this.$CountryArray_recoverycountry.asObservable();

  constructor(private apicall_restfull: ApiCallService) { }

  fnGetCountry(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apicall_restfull.fnGetPromise([], APIS_ENUM.GET_COUNTRY)
        .then((res:CountryList) => {
          this.$CountryArray_recoverycountry.next(res._paises)
          console.log(res);
          resolve();
        })
        .catch((rej) => {
          reject("Error de conexion");
        })
    })
  }
}