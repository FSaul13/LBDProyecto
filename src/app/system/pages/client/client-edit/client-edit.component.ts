import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  formgroup_EditClient: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private clientService_apis: ClientService,
    private feedback: ToastrService
  ) { }

  ngOnInit() {
    this.fninitForm();
    this.fnSubscribetoClient();
    this.route.params.subscribe( params => {
      this.fnGetClient(params.idCliente);
    });

  }

  fninitForm(){
    this.formgroup_EditClient = new FormGroup({
      _idCliente: new FormControl(null, Validators.required),
      _nombre: new FormControl(null,Validators.required),
      _apellidos: new FormControl( null, Validators.required),
      _correo: new FormControl(null,[Validators.required,Validators.email]),
      _razonSocial: new FormControl(null, Validators.required),
    })

  }
  fnSubscribetoClient():void{
    this.clientService_apis._client_recoverUserType.subscribe(res =>{
      if(res._idCliente){
        this.formgroup_EditClient.setValue({
          _idCliente: res._idCliente,
          _nombre:  res._nombre,
          _apellidos: res._apellidos,
          _correo: res._correo,
          _razonSocial: res._razonSocial,
        } as Client)
      }
      else {
        this.formgroup_EditClient.markAsUntouched();
        this.formgroup_EditClient.reset();
      }
    });


  }

  fnGetClient(num_idClient: number): void {
  
    this.clientService_apis.fnGetClientbyId(num_idClient)
    .then(() => {})
    .catch(() => {});

  }

  fnSubmitEditClient(): void {
    let EditClientValue : Client = this.formgroup_EditClient.getRawValue().forEach(str_formName => {
      EditClientValue[str_formName] = (EditClientValue[str_formName] as string).trim();
    });
    this.clientService_apis.fnEditClient(EditClientValue)
    .then((message) => {
      this.feedback.success(message);
    })
    .catch((message) => {
      this.feedback.error(message);
    });
  }

}
