import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { TableComponent } from 'app/system/components/sithec-suite/controls/collapse-table/collapse-table.component';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { HeaderExtraButton } from 'app/system/components/action-header/action-header-models/header-extra-button.model';
import { TableButtons } from 'app/system/components/table/models-table/table-buttons.model';
import { TableColors } from 'app/system/components/table/models-table/table-colors.model';

import { TablePagination } from 'app/system/components/table/models-table/table-pagination.model';
import { TableSearch } from 'app/system/components/table/models-table/taable-search.model';
import { Router } from '@angular/router';
import { EnfermedadService } from 'app/system/services/enfermedad.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SithecTableService } from 'app/system/components/table/table/table.service';
import { TableSettings } from 'app/system/components/table/models-table/table-settings.model';

@Component({
  selector: 'app-enfermedad-control',
  templateUrl: './enfermedad-control.component.html',
  styleUrls: ['./enfermedad-control.component.css']
})
export class EnfermedadControlComponent implements OnInit {

  obs_Enfermedad: Observable<any[]>
  @ViewChild("deleteModal") model_delete: ElementRef;
  @ViewChild("recoveryModal") model_recovery: ElementRef;
  @ViewChild(TableComponent) tableControl: TableComponent;
  str_recoveryEnfermedad: string;
  any_recoveryEvent: any;
  any_deleteEvent: any;
  str_deleteEnfermedad: string;
  valueChange = false;

  headerSettings_header: HeaderSettings = {
    extraButtons: true,
    alignExtraButtons: "end",
    buttons: [
      { icon: "fas fa-plus", id: "new" } as HeaderExtraButton
    ]
  } as HeaderSettings;


  arrayAny_columns: any[] = [
    { name: "_nombre_comun", title: "Nombre" },
    { name: "_grado_mortalidad", title: "Grado Mortalidad" }
  ]

  settingsButtons_all: TableButtons = {
    delete: true,
    edit: true,
    colors: {
      normal: "#004288",
      hover: "#d2d4d6"
    } as TableColors
  } as TableButtons;

  tableSettings_settings: TableSettings = {
    buttons: this.settingsButtons_all,
    pagination: {
      loadOnChange: false,
      nextLabel: "",
      prebiousLabel: "",
      itemsPerPage: 5
    } as TablePagination,
    search: {
      placeholder: "",
      searchColumns: ["_nombre_comun", "_grado_mortalidad"]
    } as TableSearch,
    _actionsTitle: "",
    _id: 'Enfermedad-table',
    _headerColor: '#d2d4d6'
  } as TableSettings


  settingsButtons_delete = {
    delete: true,
    deleteIcon: 'fas fa-unlock-alt',
    colors: {
      normal: "#004288",
      hover: "#d2d4d6"
    } as TableColors
  } as TableButtons;


  constructor(
    private router: Router,
    private EnfermedadService_api: EnfermedadService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private sithecTable_control: SithecTableService
  ) {
    this.obs_Enfermedad = this.EnfermedadService_api._EnfermedadArray_recoveryEnfermedad;

  }




  ngOnInit() {
    this.fnGetEnfermedad();
  }




  fnClickExtraButton(event) {
    if (event == "new") {
      this.router.navigate(["system/admin/enfermedad/new"]);
    }
  }

  fnGetEnfermedad(): void {
    this.sithecTable_control.fnOnTableSpinner('Enfermedad-table');
    this.EnfermedadService_api.fnGetEnfermedad()
      .then(() => {
        this.sithecTable_control.fnOffTableSpinner('Enfermedad-table');
      })
      .catch(error => {
        this.sithecTable_control.fnOffTableSpinner('Enfermedad-table');
        this.toastr.error(error)
      })

  }

  fnOnDelete(event) {

    this.any_deleteEvent = event;
    this.str_deleteEnfermedad = (event.data._nombre ? event.data._nombre : "");
    this.fnOpenModal(this.model_delete, "md")
  }

  fnOnEdit(event) {
    console.log(event.data)
    this.router.navigate(["/system/admin/enfermedad/edit", event.data._id_enfermedad])
  }

  fnOpenModal(content, size) {
    this.str_deleteButton = this.str_sendDeleteButton;
    this.modalService.open(content, { size: size });
  }

  bln_loadDelete: boolean;
  str_loadDeleteButton: string = '<i class="fas fa-spinner fa-spin"></i> Eliminando';
  str_errorDeleteButton: string = '<i class="fas fa-times-circle"></i> Error';
  str_successDeleteButton: string = '<i class="fas fa-check-circle"></i> Eliminado'
  str_sendDeleteButton: string = 'Eliminar';
  str_sendRecoveryButton: string = 'Recuperar';
  str_recoveryButton: string = this.str_sendRecoveryButton;
  str_deleteButton: string = this.str_sendDeleteButton;

  fnConfirmDelete(modal: any): void {
    if (this.bln_loadDelete) {
      return;
    }
    this.str_deleteButton = this.str_loadDeleteButton;
    this.bln_loadDelete = true;
    let Enfermedad_delete = this.any_deleteEvent.data;

    this.EnfermedadService_api.fnPostDeleteEnfermedad(Enfermedad_delete)
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
      })

  }
  onValueChange(value: boolean) {
    this.valueChange = value;
    if (value == false) {
      this.EnfermedadService_api.fnResetEnfermedads()
      this.fnGetEnfermedad();
      this.tableSettings_settings.buttons = this.settingsButtons_all;
    }
    else {

      this.tableSettings_settings.buttons = this.settingsButtons_delete;
      this.fnGetDeleteEnfermedad();
    }
    //this.tableControl.fnRefreshButtonSettings();
  }

  fnOnActivate(modal: any): void {
    if (this.bln_loadDelete) {
      return;
    }
    //Recuperado del modal
    let activateEnfermedad = this.any_recoveryEvent.data;

    this.str_deleteButton = this.str_loadDeleteButton;
    this.bln_loadDelete = true;
    this.EnfermedadService_api.fnPostActivateEnfermedad(activateEnfermedad)
      .then((res) => {
        modal.dismiss('Close click');
        this.any_recoveryEvent.fnConfirmDelete();
        this.bln_loadDelete = false;
        this.toastr.success(res);
      })
      .catch((rej) => {
        this.bln_loadDelete = false;
        this.toastr.error(rej);
      })
  }

  fnOnRecovery(event) {
    this.any_recoveryEvent = event;
    this.str_deleteEnfermedad = (event.data._nombre ? event.data._nombre : "");
    this.fnOpenModal(this.model_recovery, "md")//Pedir confirmacion

  }

  fnGetDeleteEnfermedad() {
    this.sithecTable_control.fnOnTableSpinner('Enfermedad-table');
    this.EnfermedadService_api.fnGetDeleteEnfermedad()
      .then(() => {
        this.sithecTable_control.fnOffTableSpinner('Enfermedad-table');
      })
      .catch(error => {
        this.sithecTable_control.fnOffTableSpinner('Enfermedad-table');
        this.toastr.error(error)
      })
  }


}
