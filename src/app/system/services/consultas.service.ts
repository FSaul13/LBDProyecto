import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';
import { APIS_ENUM } from '../enums/APIS.enum';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService{
    
  private $Consulta_Array_recoveryConsulta: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  _ConsultaArray_recoveryConsulta: Observable<any[]> = this.$Consulta_Array_recoveryConsulta.asObservable();

  private $Consulta_recoveryConsulta: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);
  _Consulta_recoveryproductCode: Observable<any> = this.$Consulta_recoveryConsulta.asObservable();

  constructor(private api_call_Restfull: ApiCallService
  ) { }


  fnAlimentosPorAnimal(idConsulta : number): Promise<any> {
    let parametros: any = {
      _accion: 'alimentosPorAnimal',
      _valor: idConsulta
    }
    this.fnResetConsultas();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_Consulta)
        .then((res) => {
          this.$Consulta_Array_recoveryConsulta.next(res);
          
          resolve(res);
        })
        .catch((rej) => {
            this.$Consulta_Array_recoveryConsulta.next({} as any);
            reject();
        })
    })
  }



  fnSintomasPorEnfermedad(idConsulta: number): Promise<any> {
    let parametros: any = {
      _accion: 'sintomasPorEnfermedad',
      _valor: idConsulta
    }
    this.fnResetConsultas();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_Consulta)
        .then((res: any) => {
          this.$Consulta_Array_recoveryConsulta.next(res);

          resolve(res);
        })
        .catch((rej) => {
          this.$Consulta_Array_recoveryConsulta.next({} as any);
          reject();
        })
    })

  }

  fnTratamientosPorEnfermedad(idConsulta: number): Promise<any> {
    let parametros: any = {
      _accion: 'tratamientosPorEnfermedad',
      _valor: idConsulta
    }
    this.fnResetConsultas();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_Consulta)
        .then((res: any) => {
            this.$Consulta_Array_recoveryConsulta.next(res);

            resolve(res);
        })
        .catch((rej) => {
            this.$Consulta_Array_recoveryConsulta.next({} as any);
            reject();
        })
    })
  }

  fnEnfermedadConSintoma(criterioConsulta: string): Promise<any> {
    let parametros: any = {
      _accion: 'enfermedadConSintoma',
      _valor: criterioConsulta
    }
    this.fnResetConsultas();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_Consulta)
        .then((res: any) => {
            this.$Consulta_Array_recoveryConsulta.next(res);

            resolve(res);
        })
        .catch((rej) => {
            this.$Consulta_Array_recoveryConsulta.next({} as any);
            reject();
        })
    })
  }

  fnEnfermedadesSegunAnimal(idConsulta: number): Promise<any> {
    let parametros: any = {
      _accion: 'enfermedadesSegunAnimal',
      _valor: idConsulta
    }
    this.fnResetConsultas();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_Consulta)
        .then((res: any) => {
            this.$Consulta_Array_recoveryConsulta.next(res);

            resolve(res);
        })
        .catch((rej) => {
            this.$Consulta_Array_recoveryConsulta.next({} as any);
            reject();
        })
    })
  }

  fnMedicamentosPorTratamiento(idConsulta: number): Promise<any> {
    let parametros: any = {
      _accion: 'medicamentosPorTratamiento',
      _valor: idConsulta
    }
    this.fnResetConsultas();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_Consulta)
        .then((res: any) => {
            this.$Consulta_Array_recoveryConsulta.next(res);

            resolve(res);
        })
        .catch((rej) => {
            this.$Consulta_Array_recoveryConsulta.next({} as any);
            reject();
        })
    })
  }

  fnEnfermedadesPeligrosas(): Promise<any> {
    let parametros: any = {
      _accion: 'enfermedades_peligrosas'
    }
    this.fnResetConsultas();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_Consulta)
        .then((res: any) => {
            this.$Consulta_Array_recoveryConsulta.next(res);

            resolve(res);
        })
        .catch((rej) => {
            this.$Consulta_Array_recoveryConsulta.next({} as any);
            reject();
        })
    })
  }
  
  fnMedicamentosSegunTipo(criterioConsulta: string): Promise<any> {
    let parametros: any = {
      _accion: 'medicamentosSegunTipo',
      _valor: criterioConsulta
    }
    this.fnResetConsultas();
    return new Promise((resolve, reject) => {
      this.api_call_Restfull.fnPostPromise(parametros, APIS_ENUM.GET_Consulta)
        .then((res: any) => {
            this.$Consulta_Array_recoveryConsulta.next(res);

            resolve(res);
        })
        .catch((rej) => {
            this.$Consulta_Array_recoveryConsulta.next({} as any);
            reject();
        })
    })
  }

  fnResetConsultas() {
    this.$Consulta_Array_recoveryConsulta.next([]);
  }
}