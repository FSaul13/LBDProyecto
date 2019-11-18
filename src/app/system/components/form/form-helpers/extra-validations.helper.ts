import { ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

export function fnFormValidatorEqualFields(formControl_equalTo: AbstractControl, str_error: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value == formControl_equalTo.value) {
            return null;
        }
        return { fieldsMatch: str_error };
    }
}

export function fnFormInputsTableValidation(fields: string[], message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        let formcontrol_control: FormControl = (control as FormControl);
        let valid = true;
        if (formcontrol_control.value) {
            let any_data: any[] = formcontrol_control.value;
            any_data.forEach(selectData => {
                fields.forEach(checkColumn => {
                    if (!selectData[checkColumn]) {
                        valid = false;
                    }
                })
            })
        }
        if (valid) {
            return null;
        } else {
            return { tableColumns: message };
        }
    }
}

export function fnFormValidatorBigThanDate(formControl_bigDate: AbstractControl, str_error: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
        if (control.value > formControl_bigDate.value) {
            return null;
        }
        else {
            return { bigDate: str_error };
        }
    }
}