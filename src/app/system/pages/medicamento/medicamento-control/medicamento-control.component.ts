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
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SithecTableService } from 'app/system/components/table/table/table.service';
import { TableSettings } from 'app/system/components/table/models-table/table-settings.model';
import { MedicamentoService } from 'app/system/services/medicamento.service';

@Component({
  selector: 'app-medicamento-control',
  templateUrl: './medicamento-control.component.html',
  styleUrls: ['./medicamento-control.component.css']
})
export class MedicamentoControlComponent implements OnInit {


  obs_Medicamento: Observable<any[]>
  @ViewChild("deleteModal") model_delete: ElementRef;
  @ViewChild("recoveryModal") model_recovery: ElementRef;
  @ViewChild(TableComponent) tableControl: TableComponent;
  str_recoveryMedicamento: string;
  any_recoveryEvent: any;
  any_deleteEvent: any;
  str_deleteMedicamento: string;
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
    { name: "_descripcion", title: "Descripcion" }
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
    _id: 'Medicamento-table',
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
    private MedicamentoService_api: MedicamentoService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private sithecTable_control: SithecTableService
  ) {
    this.obs_Medicamento = this.MedicamentoService_api._MedicamentoArray_recoveryMedicamento;

  }




  ngOnInit() {
    this.fnGetMedicamento();
  }




  fnClickExtraButton(event) {
    if (event == "new") {
      this.router.navigate(["system/admin/medicamento/new"]);
    }
  }

  fnGetMedicamento(): void {
    this.sithecTable_control.fnOnTableSpinner('Medicamento-table');
    this.MedicamentoService_api.fnGetMedicamento()
      .then(() => {
        this.sithecTable_control.fnOffTableSpinner('Medicamento-table');
      })
      .catch(error => {
        this.sithecTable_control.fnOffTableSpinner('Medicamento-table');
        this.toastr.error(error)
      })

  }

  fnOnDelete(event) {

    this.any_deleteEvent = event;
    this.str_deleteMedicamento = (event.data._nombre ? event.data._nombre : "");
    this.fnOpenModal(this.model_delete, "md")
  }

  fnOnEdit(event) {

    this.router.navigate(["/system/admin/Medicamento/edit", event.data._idMedicamento])
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
    let Medicamento_delete = this.any_deleteEvent.data;

    this.MedicamentoService_api.fnPostDeleteMedicamento(Medicamento_delete)
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
      this.MedicamentoService_api.fnResetMedicamentos()
      this.fnGetMedicamento();
      this.tableSettings_settings.buttons = this.settingsButtons_all;
    }
    else {

      this.tableSettings_settings.buttons = this.settingsButtons_delete;
      this.fnGetDeleteMedicamento();
    }
    //this.tableControl.fnRefreshButtonSettings();
  }

  fnOnActivate(modal: any): void {
    if (this.bln_loadDelete) {
      return;
    }
    //Recuperado del modal
    let activateMedicamento = this.any_recoveryEvent.data;

    this.str_deleteButton = this.str_loadDeleteButton;
    this.bln_loadDelete = true;
    this.MedicamentoService_api.fnPostActivateMedicamento(activateMedicamento)
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
    this.str_deleteMedicamento = (event.data._nombre ? event.data._nombre : "");
    this.fnOpenModal(this.model_recovery, "md")//Pedir confirmacion

  }

  fnGetDeleteMedicamento() {
    this.sithecTable_control.fnOnTableSpinner('Medicamento-table');
    this.MedicamentoService_api.fnGetDeleteMedicamento()
      .then(() => {
        this.sithecTable_control.fnOffTableSpinner('Medicamento-table');
      })
      .catch(error => {
        this.sithecTable_control.fnOffTableSpinner('Medicamento-table');
        this.toastr.error(error)
      })
  }


}
