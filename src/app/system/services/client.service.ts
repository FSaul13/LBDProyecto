import { Injectable } from '@angular/core';

import { ApiCallService } from './api-call.service';


@Injectable()
export class ClientService {

  /*private $clientArray_recoveryClients: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  _clientArray_recoveryClient: Observable<Client[]> = this.$clientArray_recoveryClients.asObservable();

  private $client_recoveryClient: BehaviorSubject<Client> = new BehaviorSubject<Client>({} as Client);
  _client_recoverUserType: Observable<Client> = this.$client_recoveryClient.asObservable();

*/
  constructor(private apicall_restfull: ApiCallService) {

  }

  /*fnGetClient(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apicall_restfull.fnGetPromise([], APIS_ENUM.GET_CLIENTS)
        .then((res: ClientList) =>{
          this.$clientArray_recoveryClients.next(res._clientes);
          console.log(res)
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }

  fnEditClient(client_edit: Client ):Promise <any> {
    return new Promise((resolve,reject) =>{
      this.apicall_restfull.fnPostPromise(client_edit,APIS_ENUM.POST_EDIT_CLIENT)
      .then((res : Response) => {
        if(res._success){
          resolve(res._message);
        }
        else{
          reject(res._message);
        }
      })
      .catch(rej =>{
        console.log(rej);
        reject("Error de conexion");
      })
    })
  }
  fnPostNewClient(newClient: Client): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apicall_restfull.fnPostPromise(newClient, APIS_ENUM.POST_NEW_CLIENT)
        .then((res: Response) => {
          console.log(res);
          if (res._success) {
            resolve(res._message)
          } else {
            reject(res._message)
          }
        })
        .catch(rej => {
          reject('Error de conexion');
        });
    })

  }

  

  fnGetClientbyId (idClient: number): Promise<any> {
    
    return new Promise((resolve, reject) => {
      this.apicall_restfull.fnGetPromise([idClient], APIS_ENUM.GET_CLIENTS_BY_ID)
        .then((res: Client) => {
          this.$client_recoveryClient.next(res);
          resolve();
        })
         .catch(rej => {
          this.$client_recoveryClient.next({} as Client);
          reject();
        })
    })
  }
*/
}
