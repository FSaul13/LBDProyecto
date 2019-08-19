import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiHelper } from '../helpers/apiHelper';

@Injectable()
export class ApiCallService {

  str_ip: string = environment.files;

  constructor(private http: HttpClient) {

  }

  fnGetHttpClient(): HttpClient {
    return this.http;
  }

  fnPostPromise(any_body: any, str_api: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.str_ip + str_api, any_body).toPromise()
        .then((res: any) => {
          resolve(res)
        })
        .catch(rej => {
          reject(rej)
        });
    });
  }

  fnPostWithParamsPromise(any_body: any, array_params: Array<any>, str_api: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiHelper: ApiHelper = new ApiHelper();
      let any_validCall = apiHelper.fnSetParams(array_params, str_api);
      if (any_validCall._success) {
        this.http.post(this.str_ip + any_validCall._message, any_body).toPromise()
          .then((res: any) => {
            resolve(res)
          })
          .catch(rej => {
            reject(rej)
          });
      } else {
        reject()
      }
    });
  }

  fnGetPromise(array_params: Array<any>, str_api: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiHelper: ApiHelper = new ApiHelper();
      let any_validCall = apiHelper.fnSetParams(array_params, str_api);
      //console.log(any_validCall)
      if (any_validCall._success) {
        this.http.get(this.str_ip + any_validCall._message).toPromise()
          .then((res: any) => {
            resolve(res)
          })
          .catch(rej => {
            reject(rej)
          });
      } else {
        reject()
      }

    });
  }

  fnGetWithParams(arrayParams: any, str_api): Promise<any> {
    
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.http.get(str_api, { params: arrayParams }).toPromise()
        .then(res => {
          resolve(res)
        })
        .catch(rej => {
          reject()
        })
    });
  }

}
