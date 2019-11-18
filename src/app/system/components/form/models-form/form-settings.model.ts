import { FormColumns } from './form-columns.model';
import { FormButton } from './form-button.model';
import { FormTitle } from './form-title.model';
import { FormGroupModel } from './form-group.model';
export class FormSettings{

    //Titulo del formuario
    title:FormTitle;

    //campos del formulario, objeto any compuesto de objtos FormInput
    fields:any;

    //Layout de columnas a utilizar de bootstrap
    columns:FormColumns;

    //Configuraciones del boton de guardado
    saveButton:FormButton;

    //label integrado o por separado 'title'|'append'
    labelType:string;

    //limpiar el formulario al ejecutar guardar cambios
    resetOnSuccess:boolean;

    //Traducir
    _translate:boolean;

    //Grupos
    _groups:FormGroupModel[];
}