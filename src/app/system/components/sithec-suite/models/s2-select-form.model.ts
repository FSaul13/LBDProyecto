import { Observable } from 'rxjs';
import { S2BootstrapColumnsModel } from './s2-bootstrap-columns.model';

export class S2SelectFormModel{
    _label:string;
    _valueKey:string;
    _optionKey:string;
    _options:any[]|Observable<any[]>;
    _columns:S2BootstrapColumnsModel;
}