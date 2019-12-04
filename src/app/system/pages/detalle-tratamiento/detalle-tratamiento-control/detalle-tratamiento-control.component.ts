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
import { DetalleTratamientoService } from 'app/system/services/detalle-tratamiento.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SithecTableService } from 'app/system/components/table/table/table.service';
import { TableSettings } from 'app/system/components/table/models-table/table-settings.model';

@Component({
  selector: 'app-detalle-tratamiento-control',
  templateUrl: './detalle-tratamiento-control.component.html',
  styleUrls: ['./detalle-tratamiento-control.component.css']
})
export class DetalleTratamientoControlComponent implements OnInit {


  obs_DetalleTratamiento: Observable<any[]>
  @ViewChild("deleteModal") model_delete: ElementRef;
  @ViewChild("recoveryModal") model_recovery: ElementRef;
  @ViewChild(TableComponent) tableControl: TableComponent;
  str_recoveryDetalleTratamiento: string;
  any_recoveryEvent: any;
  any_deleteEvent: any;
  str_deleteDetalleTratamiento: string;
  valueChange = false;

  headerSettings_header: HeaderSettings = {
    extraButtons: true,
    alignExtraButtons: "end",
    buttons: [
      { icon: "fas fa-plus", id: "new" } as HeaderExtraButton
    ]
  } as HeaderSettings;


  arrayAny_columns: any[] = [
    { name: "Sintoma", title: "Medicamento" },
    { name: "Tratamiento", title: "Tratamiento" },
    { name: "_max_cant_med", title: "Mexima cantidad Medicamentos" },
    { name: "_min_can_med", title: "Minima cantidad Medicamentos" }
  ]
  _

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
      searchColumns: ["Sintoma", "Tratamiento", "_min_can_med", "_max_cant_med"],
    } as TableSearch,
    _actionsTitle: "",
    _id: 'DetalleTratamiento-table',
    _headerColor: '#d2d4d6'
  } as TableSettings;


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
    private DetalleTratamientoService_api: DetalleTratamientoService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private sithecTable_control: SithecTableService
  ) {
    this.obs_DetalleTratamiento = this.DetalleTratamientoService_api._DetalleTratamientoArray_recoveryDetalleTratamiento;

  }




  ngOnInit() {
    this.fnGetDetalleTratamiento();
  }




  fnClickExtraButton(event) {
    if (event == "new") {
      this.router.navigate(["system/admin/detalle-tratamiento/new"]);
    }
  }

  fnGetDetalleTratamiento(): void {
    this.sithecTable_control.fnOnTableSpinner('DetalleTratamiento-table');
    this.DetalleTratamientoService_api.fnGetDetalleTratamiento()
      .then(() => {
        this.sithecTable_control.fnOffTableSpinner('DetalleTratamiento-table');
      })
      .catch(error => {
        this.sithecTable_control.fnOffTableSpinner('DetalleTratamiento-table');
        this.toastr.error(error)
      })

  }

  fnOnDelete(event) {

    this.any_deleteEvent = event;
    this.str_deleteDetalleTratamiento = (event.data._nombre ? event.data._nombre : "");
    this.fnOpenModal(this.model_delete, "md")
  }

  fnOnEdit(event) {
    console.log(event);
    this.router.navigate(["/system/admin/detalle-tratamiento/edit", event.data._id_tratamiento, event.data._id_medicamento])
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
    let DetalleTratamiento_delete = this.any_deleteEvent.data;

    this.DetalleTratamientoService_api.fnPostDeleteDetalleTratamiento(DetalleTratamiento_delete)
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
      this.DetalleTratamientoService_api.fnResetDetalleTratamientos()
      this.fnGetDetalleTratamiento();
      this.tableSettings_settings.buttons = this.settingsButtons_all;
    }
    else {

      this.tableSettings_settings.buttons = this.settingsButtons_delete;
      this.fnGetDeleteDetalleTratamiento();
    }
    //this.tableControl.fnRefreshButtonSettings();
  }

  fnOnActivate(modal: any): void {
    if (this.bln_loadDelete) {
      return;
    }
    //Recuperado del modal
    let activateDetalleTratamiento = this.any_recoveryEvent.data;

    this.str_deleteButton = this.str_loadDeleteButton;
    this.bln_loadDelete = true;
    this.DetalleTratamientoService_api.fnPostActivateDetalleTratamiento(activateDetalleTratamiento)
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
    this.str_deleteDetalleTratamiento = (event.data.nombre ? event.data.nombre : "");
    this.fnOpenModal(this.model_recovery, "md")//Pedir confirmacion

  }

  fnGetDeleteDetalleTratamiento() {
    this.sithecTable_control.fnOnTableSpinner('DetalleTratamiento-table');
    this.DetalleTratamientoService_api.fnGetDeleteDetalleTratamiento()
      .then(() => {
        this.sithecTable_control.fnOffTableSpinner('DetalleTratamiento-table');
      })
      .catch(error => {
        this.sithecTable_control.fnOffTableSpinner('DetalleTratamiento-table');
        this.toastr.error(error)
      })
  }


}
