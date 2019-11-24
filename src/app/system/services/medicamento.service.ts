import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private $Medicamento_Array_recoveryMedicamento: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _MedicamentoArray_recoveryMedicamento: Observable<any[]> = this.$Medicamento_Array_recoveryMedicamento.asObservable();

  private $Medicamento_recoveryMedicamento: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
  _Medicamento_recoveryproductCode: Observable<any> = this.$Medicamento_recoveryMedicamento.asObservable();

  constructor(private api_call_Restfull: ApiCallService
  ) { }

  fnGetMedicamento(): Promise<any> {
    let parametros: any = {
      _accion: "obtenerMedicamento"
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_MEDICAMENTO)
        .then((res) => {
          this.$Medicamento_Array_recoveryMedicamento.next(res);
          resolve()
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }



  fnGetMedicamentoById(idMedicamento: number): Promise<any> {
    let parametros: any = {
      _accion: "obtenerId",
      _valor: idMedicamento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_MEDICAMENTO_BY_ID)
        .then((res: any) => {
          this.$Medicamento_recoveryMedicamento.next(res);

          resolve(res);
        })
        .catch((rej) => {
          this.$Medicamento_recoveryMedicamento.next({} as any);
          reject();
        })
    })

  }

  fnPostNewMedicamento(newMedicamento: any): Promise<any> {
    let parametros: any = {
      _accion: "nuevo",
      _valor: newMedicamento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.POST_NEW_MEDICAMENTO)
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

  fnEditMedicamento(editMedicamento: any): Promise<any> {
    let parametros: any = {
      _accion: "editar",
      _valor: editMedicamento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.POST_EDIT_MEDICAMENTO)
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

  fnPostDeleteMedicamento(deleteMedicamento: any): Promise<any> {
    let parametros: any = {
      _accion: "eliminar",
      _valor: deleteMedicamento
    }
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.POST_DELETE_MEDICAMENTO)
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

  fnGetDeleteMedicamento(): Promise<any> {
    this.fnResetMedicamento();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnGetPromise([], APIS_ENUM.GET_DELETE_MEDICAMENTO)
        .then((res) => {
          this.$Medicamento_Array_recoveryMedicamento.next(res)
          resolve();
        })
        .catch(rej => {
          reject("Error de conexion")
        });
    })
  }


  fnPostActivateMedicamento(activateMedicamento: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(activateMedicamento, APIS_ENUM.POST_ACTIVATE_MEDICAMENTO)
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
  fnResetMedicamentos() {
    this.$Medicamento_Array_recoveryMedicamento.next([]);
  }
  fnResetMedicamento() {
    this.$Medicamento_recoveryMedicamento.next({} as any);
  }
}
