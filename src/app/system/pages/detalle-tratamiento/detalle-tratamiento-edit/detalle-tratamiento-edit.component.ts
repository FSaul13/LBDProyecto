import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleTratamientoService } from 'app/system/services/detalle-tratamiento.service';
import { ToastrService } from 'ngx-toastr';
import { EnfermedadService } from 'app/system/services/enfermedad.service';

@Component({
  selector: 'app-detalle-tratamiento-edit',
  templateUrl: './detalle-tratamiento-edit.component.html',
  styleUrls: ['./detalle-tratamiento-edit.component.css']
})
export class DetalleTratamientoEditComponent implements OnInit {


  sub_DetalleTratamientoSubscription: Subscription;
  bln_loadForm: boolean = true;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  FormGroupEditDetalleTratamiento: FormGroup;

  forSettings_config: FormSettings = {
    title: {
      title: 'Editar DetalleTratamiento'
    } as FormTitle,
    fields: {

      _id_tratamiento_fk: {
        hide: true
      } as FormInput,
      _id_medicamento_fk: {
        hide: true
      } as FormInput,
      _max_cant_med:
        {
          label: 'Maxima cantidad medicamento',
          trim: true,
          type: 'text'
        } as FormInput,
      _min_can_med: {
        label: 'Minima cantidad de medicamento',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _periodo_dosificacion: {
        label: 'Periodo Dosificacion',
        trim: true,
        type: 'text'
      } as FormInput,




    },
    columns: {
      xl: 12,
      lg: 12,
      md: 12,
      sm: 12
    } as FormColumns,
    saveButton: {
      validToSend: true,
      loadIconClass: '',
    } as FormButton,
    labelType: 'append',
    resetOnSuccess: true,
    _translate: true,
  } as FormSettings;

  constructor(
    private route: ActivatedRoute,
    private DetalleTratamientoService_apis: DetalleTratamientoService,
    private feedback: ToastrService,
    private router: Router,
    private enfermedadApi_service: EnfermedadService
  ) { }

  ngOnInit() {
    this.fnInitformGroup();

    this.fnSubscribetoDetalleTratamiento();
    this.route.params.subscribe(params => {
      console.log(params)
      this.fnGetDetalleTratamiento(params._id_tratamiento, params._id_medicamento);
    });
  }

  fnGetEnfermedad() {
    this.enfermedadApi_service.fnGetEnfermedad()
      .then(() => { })
      .catch(() => { })
  }

  ngOnDestroy() {
    if (this.sub_DetalleTratamientoSubscription) {
      this.sub_DetalleTratamientoSubscription.unsubscribe();
    }
    this.DetalleTratamientoService_apis.fnResetDetalleTratamiento();
  }


  fnSubscribetoDetalleTratamiento(): void {

    this.sub_DetalleTratamientoSubscription = this.DetalleTratamientoService_apis._DetalleTratamiento_recoveryproductCode.subscribe(res => {
      if (res._id_tratamiento) {
        this.FormGroupEditDetalleTratamiento.setValue({
          _id_tratamiento_fk: res._id_tratamiento,
          _id_medicamento_fk: res._id_medicamento,
          _max_cant_med: res._max_cant_med,
          _min_can_med: res._min_can_med,
          _periodo_dosificacion: res._periodo_dosificacion,



        });
      }
      else {
        this.FormGroupEditDetalleTratamiento.markAsUntouched();
        this.FormGroupEditDetalleTratamiento.reset();
      }
    });
  }



  fnInitformGroup() {
    this.FormGroupEditDetalleTratamiento = new FormGroup({
      _id_tratamiento_fk: new FormControl(null, Validators.required),
      _id_medicamento_fk: new FormControl(null, Validators.required),
      _max_cant_med: new FormControl(null, Validators.required),
      _min_can_med: new FormControl(null, Validators.required),
      _periodo_dosificacion: new FormControl(null, Validators.required),

    })
  }

  fnGetDetalleTratamiento(id_tratamiento: number, id_medicamento: number) {
    this.bln_loadForm = true;
    this.DetalleTratamientoService_apis.fnGetDetalleTratamientoById(id_tratamiento, id_medicamento)
      .then(() => {
        this.bln_loadForm = false;
      })
      .catch(error => {
        this.bln_loadForm = false;
        this.feedback.error(error)
      })
  }


  fnOnSend(event) {
    let editDetalleTratamiento = event.data;
    console.log(editDetalleTratamiento)
    this.DetalleTratamientoService_apis.fnEditDetalleTratamiento(editDetalleTratamiento)

      .then((res) => {
        this.feedback.success(res);
        event.fnSuccess();
        this.router.navigate(["system/admin/detalle-tratamiento/control"])
      })
      .catch((rej) => {
        this.feedback.error(rej);
        event.fnError();
      })
  }

}
