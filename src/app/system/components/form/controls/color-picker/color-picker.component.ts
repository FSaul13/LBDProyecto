import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormInput } from '../../../form/models-form/form-input.model';
import { FormService } from '../../../form/form.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {


  @Input() formGroup_form: FormGroup;
  @Input() formControl_control: FormControl;
  @Input() textInput_field: FormInput
  @Input() str_labelType: string;
  @Input() bln_translate: boolean;

  state: string;
  str_label: string;
  str_hex: string;

  constructor(
    private formService_func: FormService
  ) { 
    this.str_hex = '#D4C3C3';
  }

  $obs:BehaviorSubject<string> = new BehaviorSubject<string>(null)
  _obs:Observable<string> = this.$obs.asObservable();

  subscription_colors:Subscription;
  
  ngOnDestroy(){
    if(this.subscription_colors){
      this.subscription_colors.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription_colors = this.formService_func._changeColor.subscribe(colors => {
      colors.forEach(data=>{
        if(data.id == this.textInput_field.id){
          if(data.set){
            this.formService_func.fnMarkColor(this.textInput_field.id);
            this.$obs.next(data.color)
            this.formControl_control.setValue(data.color);
          }
        }
      });
    });
    
    this.str_label = this.textInput_field.label;
    //this.$obs.next('#D4C3C3')
    //this.formControl_control.setValue('#D4C3C3')
  }

  


  changeComplete(event): void {
    this.formControl_control.setValue(event.color.hex)
  }

}
