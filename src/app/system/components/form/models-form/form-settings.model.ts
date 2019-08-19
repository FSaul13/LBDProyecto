import { FormColumns } from './form-columns.model';
import { FormButton } from './form-button.model';
import { FormTitle } from './form-title.model';
export class FormSettings{
    title:FormTitle;
    fields:any;
    columns:FormColumns;
    saveButton:FormButton;
    labelType:string;
    resetOnSuccess:boolean;
}