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
import { AlimentService } from 'app/system/services/aliment.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SithecTableService } from 'app/system/components/table/table/table.service';
import { TableSettings } from 'app/system/components/table/models-table/table-settings.model';

@Component({
  selector: 'app-aliment-control',
  templateUrl: './aliment-control.component.html',
  styleUrls: ['./aliment-control.component.css']
})
export class AlimentControlComponent implements OnInit {



  obs_Aliment: Observable<any[]>
  @ViewChild("deleteModal") model_delete: ElementRef;
  @ViewChild("recoveryModal") model_recovery: ElementRef;
  @ViewChild(TableComponent) tableControl: TableComponent;
  str_recoveryAliment: string;
  any_recoveryEvent: any;
  any_deleteEvent: any;
  str_deleteAliment: string;
  valueChange = false;

  headerSettings_header: HeaderSettings = {
    extraButtons: true,
    alignExtraButtons: "end",
    buttons: [
      { icon: "fas fa-plus", id: "new" } as HeaderExtraButton
    ]
  } as HeaderSettings;


  arrayAny_columns: any[] = [
    { name: "_nombre", title: "Nombre" },
    { name: "_presentacion", title: "Presentacion" }
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
      searchColumns: ["_nombre", "_descripcion"]
    } as TableSearch,
    _actionsTitle: "",
    _id: 'Aliment-table',
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
    private AlimentService_api: AlimentService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private sithecTable_control: SithecTableService
  ) {
    this.obs_Aliment = this.AlimentService_api._AlimentArray_recoveryAliment;

  }




  ngOnInit() {
    this.fnGetAliment();
  }




  fnClickExtraButton(event) {
    if (event == "new") {
      this.router.navigate(["system/admin/aliment/new"]);
    }
  }

  fnGetAliment(): void {
    this.sithecTable_control.fnOnTableSpinner('Aliment-table');
    this.AlimentService_api.fnGetAliment()
      .then(() => {
        this.sithecTable_control.fnOffTableSpinner('Aliment-table');
      })
      .catch(error => {
        this.sithecTable_control.fnOffTableSpinner('Aliment-table');
        this.toastr.error(error)
      })

  }

  fnOnDelete(event) {

    this.any_deleteEvent = event;
    this.str_deleteAliment = (event.data._nombre ? event.data._nombre : "");
    this.fnOpenModal(this.model_delete, "md")
  }

  fnOnEdit(event) {

    this.router.navigate(["/system/admin/aliment/edit", event.data._id_alimento])
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
    let Aliment_delete = this.any_deleteEvent.data;

    this.AlimentService_api.fnPostDeleteAliment(Aliment_delete)
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
      this.AlimentService_api.fnResetAliments()
      this.fnGetAliment();
      this.tableSettings_settings.buttons = this.settingsButtons_all;
    }
    else {

      this.tableSettings_settings.buttons = this.settingsButtons_delete;
      this.fnGetDeleteAliment();
    }
    //this.tableControl.fnRefreshButtonSettings();
  }

  fnOnActivate(modal: any): void {
    if (this.bln_loadDelete) {
      return;
    }
    //Recuperado del modal
    let activateAliment = this.any_recoveryEvent.data;

    this.str_deleteButton = this.str_loadDeleteButton;
    this.bln_loadDelete = true;
    this.AlimentService_api.fnPostActivateAliment(activateAliment)
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
    this.str_deleteAliment = (event.data._nombre ? event.data._nombre : "");
    this.fnOpenModal(this.model_recovery, "md")//Pedir confirmacion

  }

  fnGetDeleteAliment() {
    this.sithecTable_control.fnOnTableSpinner('Aliment-table');
    this.AlimentService_api.fnGetDeleteAliment()
      .then(() => {
        this.sithecTable_control.fnOffTableSpinner('Aliment-table');
      })
      .catch(error => {
        this.sithecTable_control.fnOffTableSpinner('Aliment-table');
        this.toastr.error(error)
      })
  }

}
