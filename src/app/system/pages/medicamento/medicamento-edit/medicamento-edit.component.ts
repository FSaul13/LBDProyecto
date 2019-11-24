import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoService } from 'app/system/services/medicamento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medicamento-edit',
  templateUrl: './medicamento-edit.component.html',
  styleUrls: ['./medicamento-edit.component.css']
})
export class MedicamentoEditComponent implements OnInit {

  sub_MedicamentoSubscription: Subscription;
  bln_loadForm: boolean = true;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  FormGroupEditMedicamento: FormGroup;

  forSettings_config: FormSettings = {
    title: {
      title: 'Editar Medicamento'
    } as FormTitle,
    fields: {
      _id_medicamento: {
        hide: true
      } as FormInput,
      _nombre_comun:
        {
          label: 'Nombre',
          trim: true,
          type: 'text'
        } as FormInput,
      _activo: {
        label: 'Activo',
        trim: true,
        type: 'text'
      } as FormInput,
      _tipo_medicamento: {
        label: 'Tipo Medicamento',
        trim: true,
        type: 'text'
      } as FormInput,
      _efectos_secundarios: {
        label: 'Efectos Secundarios',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _laboratorio: {
        label: 'Laboratorio',
        trim: true,
        type: 'text'
      } as FormInput,
      _precio: {
        label: 'Precio',
        type: 'number'
      } as FormInput,
      _imagen_muestra: {
        label: 'Laboratorio',
        trim: true,
        type: 'text'
      } as FormInput



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
    private MedicamentoService_apis: MedicamentoService,
    private feedback: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fnInitformGroup();
    this.fnSubscribetoMedicamento();
    this.route.params.subscribe(params => {
      console.log(params)
      this.fnGetProductCode(params._idMedicamento);
    });
  }


  ngOnDestroy() {
    if (this.sub_MedicamentoSubscription) {
      this.sub_MedicamentoSubscription.unsubscribe();
    }
    this.MedicamentoService_apis.fnResetMedicamento();
  }


  fnSubscribetoMedicamento(): void {

    this.sub_MedicamentoSubscription = this.MedicamentoService_apis._Medicamento_recoveryproductCode.subscribe(res => {
      if (res._id_medicamento) {
        this.FormGroupEditMedicamento.setValue({
          _id_medicamento: res._id_medicamento,
          _nombre_comun: res._nombre_comun,
          _activo: res._activo,
          _tipo_medicamento: res._tipo_medicamento,
          _efectos_secundarios: res._efectos_secundarios,
          _laboratorio: res._laboratorio,
          _precio: res._precio,
          _imagen_muestra: res._imagen_muestra


        });
      }
      else {
        this.FormGroupEditMedicamento.markAsUntouched();
        this.FormGroupEditMedicamento.reset();
      }
    });
  }



  fnInitformGroup() {
    this.FormGroupEditMedicamento = new FormGroup({
      _id_medicamento: new FormControl(null),
      _nombre_comun: new FormControl(null, Validators.required),
      _activo: new FormControl(null, Validators.required),
      _tipo_medicamento: new FormControl(null, Validators.required),
      _efectos_secundarios: new FormControl(null, Validators.required),
      _laboratorio: new FormControl(null, Validators.required),
      _precio: new FormControl(null, Validators.required),
      _imagen_muestra: new FormControl(null)
    })
  }

  fnGetProductCode(idMedicamento: number) {
    this.bln_loadForm = true;
    this.MedicamentoService_apis.fnGetMedicamentoById(idMedicamento)
      .then(() => {
        this.bln_loadForm = false;
      })
      .catch(error => {
        this.bln_loadForm = false;
        this.feedback.error(error)
      })
  }


  fnEditData(event) {
    console.log(event)

    let editMedicamento = event.data;

    this.MedicamentoService_apis.fnEditMedicamento(editMedicamento)
      .then((res) => {
        this.feedback.success(res);
        event.fnSuccess();
        this.router.navigate(["system/admin/medicamento/control"])
      })
      .catch((rej) => {
        this.feedback.error(rej);
        event.fnError();
      })
  }

}



