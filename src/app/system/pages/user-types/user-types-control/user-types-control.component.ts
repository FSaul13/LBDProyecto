import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserTypesService } from '../../../services/user-types.service';
import { TableSettings } from '../../../components/table/models-table/table-settings.model';
import { TableButtons } from '../../../components/table/models-table/table-buttons.model';
import { TableColors } from '../../../components/table/models-table/table-colors.model';
import { TablePagination } from '../../../components/table/models-table/table-pagination.model';
import { TableSearch } from '../../../components/table/models-table/taable-search.model';
import { Observable } from 'rxjs';
import { TypeUser } from '../../../models/typeUser';
import { Router } from '@angular/router';
import { HeaderSettings } from '../../../components/action-header/action-header-models/header-settings.model';
import { HeaderExtraButton } from '../../../components/action-header/action-header-models/header-extra-button.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-types-control',
  templateUrl: './user-types-control.component.html',
  styleUrls: ['./user-types-control.component.css']
})
export class UserTypesControlComponent implements OnInit {

  @ViewChild("deleteModal") model_delete: ElementRef;
  any_deleteEvent: any;
  str_deleteUserType: string;

  headerSettings_header:HeaderSettings = {
    extraButtons: true,
    alignExtraButtons: "end",
    buttons: [
      { icon:"fas fa-plus", id:"new"} as HeaderExtraButton
    ]
  } as HeaderSettings

  obs_userTypes:Observable<TypeUser[]>;

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
      itemsPerPage: 10
    } as TablePagination,
    search: {
      placeholder: "Buscar tipos de usuario..."
    } as TableSearch
  } as TableSettings

  constructor(
    private userTypesService_apis: UserTypesService,
    private router:Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { 
    this.obs_userTypes = userTypesService_apis._userTypesArray_recoverUserTypes;
  }

  ngOnInit() {
    this.fnLoadViewData();
  }

  fnLoadViewData(): void {
    this.fnGetUserTypes();
  }

  fnGetUserTypes(): void {
    this.userTypesService_apis.fnGetUserTypes()
      .then(() => { })
      .catch(error => {
        this.toastr.error(error)
      })
  }

  fnOnDelete(event){
    this.any_deleteEvent = event;
    this.str_deleteUserType = (event.data._nombre ? event.data._nombre : "") + " " + (event.data._apellidos ? event.data._apellidos : "");
    this.fnOpenModal(this.model_delete, "md")
  }

  fnOnEdit(event){
    let userType_edit:TypeUser = event.data;
    this.router.navigate(["system/admin/user-types/edit",userType_edit._idTipoUsuario]);
  }

  fnClickExtraButton(event){
    if(event == "new"){
      this.router.navigate(["system/admin/user-types/new"]);
    }
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
    let userType_delete: TypeUser = this.any_deleteEvent.data;
    this.userTypesService_apis.fnPostDeleteUserType(userType_delete)
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
        this.toastr.success(error)
      })

  }

}
