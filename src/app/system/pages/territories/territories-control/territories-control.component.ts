import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TerritoriesService } from '../../../services/territories.service';
import { Observable } from 'rxjs';
import { Territory } from '../../../models/territory';
import { FormGroup } from '@angular/forms';
import { TableSettings } from '../../../components/table/models-table/table-settings.model';
import { TableButtons } from '../../../components/table/models-table/table-buttons.model';
import { TableColors } from '../../../components/table/models-table/table-colors.model';
import { TablePagination } from '../../../components/table/models-table/table-pagination.model';
import { TableSearch } from '../../../components/table/models-table/taable-search.model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-territories-control',
  templateUrl: './territories-control.component.html',
  styleUrls: ['./territories-control.component.css']
})
export class TerritoriesControlComponent implements OnInit {

  obs_territories:Observable<Territory[]>
  @ViewChild("deleteModal") model_delete: ElementRef;
  str_deleteTerritories: string;
  any_deleteEvent: any;

  arrayAny_columns:any[] = [
    {name:"_nombre", title:"Nombre"},
    {name:"_descripcion", title:"Descripción"},
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
      placeholder: "Buscar territorios...",
      searchColumns: ["_nombre", "_descripcion"]
    } as TableSearch
  } as TableSettings
  
  constructor(
    private territoriesService_apis:TerritoriesService,
    private router:Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { 
    this.obs_territories = territoriesService_apis._territoryArray_recoveryTerritories;
  }

  ngOnInit() {
    this.fnGetTerritories()
  }

  

  fnGetTerritories():void{
    this.territoriesService_apis.fnGetTerritories()
    .then(()=>{})
    .catch(()=>{})
  }

  fnOnDelete(event){
    console.log(event)
    this.any_deleteEvent = event;
    this.str_deleteTerritories = (event.data._nombre ? event.data._nombre : "") + " " + (event.data._apellidos ? event.data._apellidos : "");
    this.fnOpenModal(this.model_delete, "md")
    console.log(event)
  }

  fnOnEdit(event){
    this.router.navigate(["/system/admin/territories/edit",event.data._idTerritorio])
    console.log(event)
  }

  fnOpenModal(content, size) {
    this.str_deleteButton = this.str_sendDeleteButton;
    this.modalService.open(content, { size: size });
  }

  bln_loadDelete:boolean;
  str_loadDeleteButton:string = '<i class="fas fa-spinner fa-spin"></i> Eliminando';
  str_errorDeleteButton:string = '<i class="fas fa-times-circle"></i> Error';
  str_successDeleteButton:string = '<i class="fas fa-check-circle"></i> Eliminado'
  str_sendDeleteButton:string = 'Eliminar';
  str_deleteButton:string = this.str_sendDeleteButton;
  fnConfirmDelete(modal: any): void {
    if(this.bln_loadDelete){
      return;
    }
    this.str_deleteButton = this.str_loadDeleteButton;
    this.bln_loadDelete = true;
    let territory_delete: Territory = this.any_deleteEvent.data;
    /*
    this.territoriesService_apis.fnPostDeleteUser(territory_delete)
      .then(success => {
        modal.dismiss('Close click');
        this.str_deleteButton = this.str_successDeleteButton;
        this.bln_loadDelete = false;
        this.any_deleteEvent.fnConfirmDelete();
        this.toastr.success(success);
      })
      .catch(error => {
        this.str_deleteButton = this.str_errorDeleteButton;
        this.bln_loadDelete = false;
        this.toastr.error(error)
      })*/

  }


}
