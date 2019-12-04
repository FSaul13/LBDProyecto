import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderSettings } from 'app/system/components/action-header/action-header-models/header-settings.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormSettings } from 'app/system/components/form/models-form/form-settings.model';
import { FormTitle } from 'app/system/components/form/models-form/form-title.model';
import { FormInput } from 'app/system/components/form/models-form/form-input.model';
import { FormColumns } from 'app/system/components/form/models-form/form-columns.model';
import { FormButton } from 'app/system/components/form/models-form/form-button.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlimentService } from 'app/system/services/aliment.service';
import { ToastrService } from 'ngx-toastr';
import { FormTableFilters } from 'app/system/components/form/models-form/form-table-filters.model';
import { FormTableFiltersSettings } from 'app/system/components/form/models-form/form-table-filters-settings.model';
import { FormTablePagination } from 'app/system/components/form/models-form/form-table-pagination.model';
import { AnimalService } from 'app/system/services/animal.service';
import { FormComponent } from 'app/system/components/form/form/form.component';

@Component({
  selector: 'app-aliment-edit',
  templateUrl: './aliment-edit.component.html',
  styleUrls: ['./aliment-edit.component.css']
})
export class AlimentEditComponent implements OnInit {

  sub_AlimentSubscription: Subscription;
  bln_loadForm: boolean = true;
  @ViewChild(FormComponent) formComponent: ElementRef;

  headerSettings_header: HeaderSettings = {
    backButton: true
  } as HeaderSettings;

  FormGroupEditAliment: FormGroup;

  forSettings_config: FormSettings = {
    title: {
      title: 'Editar Alimento'
    } as FormTitle,
    fields: {
      _id_alimento: {
        hide: true
      } as FormInput,
      _nombre:
        {
          label: 'Nombre',
          trim: true,
          type: 'text'
        } as FormInput,
      _presentacion: {
        label: 'Caracteristicas',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _indicaciones_uso: {
        label: 'Indicaciones',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _contenido_alimenticio: {
        label: 'Contenido Alimenticio',
        trim: true,
        type: 'textarea'
      } as FormInput,
      _imagen_alimento: {
        label: 'Imagen',
        trim: true,
        type: 'text'
      } as FormInput,
      _precio: {
        label: 'Precio',
        type: 'number'
      } as FormInput,
      _animal: {
        id: "animal",
        type: "table",
        label: 'Animal',
        options: this.animalService_api._AnimalArray_recoveryAnimal,
        tableColumns: [{ title: 'Nombre', name: 'nombre' }],
        tableFilters: {
          filters: [
            { type: "text", label: "Nombre", filterColum: "_nombre" } as FormTableFilters,
          ] as FormTableFilters[]
        } as FormTableFiltersSettings,
        _pagination: {
          _next: "Siguiente",
          _previous: "Anterior",
          _itemsPerPage: 5
        } as FormTablePagination,
        disbleHeaderCheck: true,
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
    private AlimentService_apis: AlimentService,
    private feedback: ToastrService,
    private router: Router,
    private animalService_api: AnimalService
  ) { }

  ngOnInit() {
    this.fnInitformGroup();
    this.fnGetAnimal()
    this.fnSubscribetoAliment();
    this.route.params.subscribe(params => {
      console.log(params)
      this.fnGetProductCode(params._idAlimento);
    });
  }

  fnGetAnimal() {
    this.animalService_api.fnGetAnimal()
      .then(() => { })
      .catch(() => { })
  }



  ngOnDestroy() {
    if (this.sub_AlimentSubscription) {
      this.sub_AlimentSubscription.unsubscribe();
    }
    this.AlimentService_apis.fnResetAliment();
  }


  fnSubscribetoAliment(): void {

    this.sub_AlimentSubscription = this.AlimentService_apis._Aliment_recoveryproductCode.subscribe(res => {

      if (res._id_alimento) {
        console.log(res)
        const data = [];
        res._animal.forEach(val => {
          console.log(val.id_animal)
          data.push(val.id_animal);
        })
        console.log(data);
        this.forSettings_config.fields._animal._initTable = {
          _column: 'id_animal',
          _values: data
        };
        this.FormGroupEditAliment.setValue({
          _id_alimento: res._id_alimento,
          _presentacion: res._presentacion,
          _indicaciones_uso: res._indicaciones_uso,
          _contenido_alimenticio: res._contenido_alimenticio,
          _precio: res._precio,
          _imagen_alimento: res._imagen_alimento,
          _nombre: res._nombre,
          _animal: []


        });
        setTimeout(() => {

          const formComponent: FormComponent = this.formComponent as any;
          formComponent.fnInitTablesValue();
        }, 1000);
      }
      else {
        this.FormGroupEditAliment.markAsUntouched();
        this.FormGroupEditAliment.reset();
      }
    });
  }



  fnInitformGroup() {
    this.FormGroupEditAliment = new FormGroup({
      _id_alimento: new FormControl(null, Validators.required),
      _nombre: new FormControl(null, Validators.required),
      _presentacion: new FormControl(null, Validators.required),
      _indicaciones_uso: new FormControl(null, Validators.required),
      _contenido_alimenticio: new FormControl(null, Validators.required),
      _precio: new FormControl(null, Validators.required),
      _imagen_alimento: new FormControl(null),
      _animal: new FormControl(null)
    })
  }

  fnGetProductCode(idAliment: number) {
    this.bln_loadForm = true;
    this.AlimentService_apis.fnGetAlimentById(idAliment)
      .then(() => {
        this.bln_loadForm = false;
      })
      .catch(error => {
        this.bln_loadForm = false;
        this.feedback.error(error)
      })
  }


  fnEditData(event) {
    console.log(event);
    let str1 = new String();

    event.data._animal.forEach(element => {
      console.log(element.id_animal);
      str1 += element.id_animal;
      str1 += ','
    });
    let str2 = str1.substring(0, str1.length - 1)

    console.log(str2)
    console.log("llego");
    let editAliment = {
      _id_alimento: event.data._id_alimento,
      _presentacion: event.data._presentacion,
      _indicaciones_uso: event.data._indicaciones_uso,
      _contenido_alimenticio: event.data._contenido_alimenticio,
      _precio: event.data._precio,
      _imagen_alimento: event.data._imagen_alimento,
      _nombre: event.data._nombre,
      _animal: str2

    }

    this.AlimentService_apis.fnEditAliment(editAliment)
      .then((res) => {
        this.feedback.success(res);
        event.fnSuccess();
        this.router.navigate(["system/admin/aliment/control"])
      })
      .catch((rej) => {
        this.feedback.error(rej);
        event.fnError();
      })
  }

}
