import { FormGroup } from '@angular/forms';
import { S2FormGroupModel } from './s2-form-group.model';
import { S2ButtonModel } from './s2-button.model';

export class S2SettingsFormGeneratorModel{
    _translate:any;
    _formGroup:FormGroup;
    _groups:S2FormGroupModel[];
    _saveButton:S2ButtonModel;
    
}