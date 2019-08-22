import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client';
import { TableSettings } from '../../../components/table/models-table/table-settings.model';
import { TableButtons } from '../../../components/table/models-table/table-buttons.model';
import { TableColors } from '../../../components/table/models-table/table-colors.model';
import { TablePagination } from '../../../components/table/models-table/table-pagination.model';
import { TableSearch } from '../../../components/table/models-table/taable-search.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-control',
  templateUrl: './client-control.component.html',
  styleUrls: ['./client-control.component.css']
})
export class ClientControlComponent implements OnInit {

  obs_client: Observable <Client [] >;


  arrayAny_columns:any[] = [
    {name:"_nombre", title:"Nombre"},
    {name:"_apellidos", title:"Apellidos"},
    {name:"_correo", title:"Correo"},
  ]

  tableSettings_settings:TableSettings = {
    buttons: {
      delete: true,
      edit: true,
      colors: {
        normal: "#118c84",
        hover: "#3a3296"
      } as TableColors
    } as TableButtons,
    pagination: {
      loadOnChange: false,
      nextLabel: "Siguiente",
      prebiousLabel: "Anterior",
      itemsPerPage: 5
    } as TablePagination,
    search: {
      placeholder: "Buscar Apellidos...",
      searchColumns: ["_nombre", "_apellidos","_correo"]
    } as TableSearch
  } as TableSettings
  

  constructor(
    private clientService_api: ClientService,
    private router: Router 
  ) 
  { 
    this.obs_client = clientService_api._clientArray_recoveryClient;
  }

  ngOnInit() {
    this.fnGetClient()
  }
  
  fnGetClient():void{
    this.clientService_api.fnGetClient()
    .then(()=>{})
    .catch(()=>{});


  }

  fnOnDelete(event){
    
    console.log(event)
  }

  fnOnEdit(event){
     this.router.navigate(["/system/admin/client/edit",event.data._idCliente])
    console.log(event)
  }
}
