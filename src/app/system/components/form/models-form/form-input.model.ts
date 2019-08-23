import { Observable } from 'rxjs';
import { FormErrors } from './form-errors.model';

export class FormInput{
    label:string;
    placeholder:string;
    type:string;
    options:Observable<any>;
    key:string;
    value:string;
    errors:FormErrors;
    hide:boolean;
    trim:boolean;
}