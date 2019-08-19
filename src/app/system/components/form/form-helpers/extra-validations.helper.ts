import { ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

export function fnFormValidatorEqualFields(formControl_equalTo:AbstractControl,str_error:string):ValidatorFn{
    return  (control:AbstractControl): ValidationErrors => {
        if(control.value == formControl_equalTo.value){
            return null;
        }
        return { fieldsMatch: str_error };
    }
}