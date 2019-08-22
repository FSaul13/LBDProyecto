import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {

  formgroup_newClient: FormGroup;
  constructor(private client_service_apis: ClientService,
    private feedback: ToastrService ) { }

  ngOnInit() {
   this.fnInitForm();
  }
   fnInitForm(){
    this.formgroup_newClient = new FormGroup({
    _nombre: new FormControl(null,Validators.required),
    _apellidos: new FormControl( null, Validators.required),
    _correo: new FormControl(null,[Validators.required,Validators.email]),
    _razonSocial: new FormControl(null, Validators.required),
    });
   }

   fnSubmitNewClient(){
     let PutnewClient : Client = this.formgroup_newClient.getRawValue();
     this.client_service_apis.fnPostNewClient(PutnewClient)
     .then((message) => {
       this.feedback.success(message)
     })
     .catch((message) => 
     {
       this.feedback.error(message);
     })
   }
}
