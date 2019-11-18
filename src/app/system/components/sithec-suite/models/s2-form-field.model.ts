import { S2InputForm } from './s2-input-form.model';
import { S2FormGroupModel } from './s2-form-group.model';
import { S2SelectFormModel } from './s2-select-form.model';

export class S2FormField{
    _id:string;
    _type:string;
    _hide:boolean;
    _input:S2InputForm;
    _select:S2SelectFormModel;
    _group:S2FormGroupModel;
}