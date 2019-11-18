import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { S2FormGroupModel } from '../../models/s2-form-group.model';
import { S2ButtonModel } from '../../models/s2-button.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 's2-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css']
})
export class FormGeneratorComponent implements OnInit {

  @Input() S2FormGroup:FormGroup;
  @Input() groups:S2FormGroupModel[];
  @Input() translate:any;
  @Input() button:S2ButtonModel;
  
  @Output() onKeyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  @Input() sending:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  fnKeyup(event): void {
    this.fnUpdateFormValidations();
    this.onKeyup.emit(event);
  }

  fnChange(event): void {
    this.fnUpdateFormValidations();
    this.onChange.emit(event);
  }

  fnUpdateFormValidations(){
    Object.keys(this.S2FormGroup.controls).forEach(key=>{
      this.S2FormGroup.get(key).updateValueAndValidity();
    });
  }

  fnSubmit(){
    this.sending = true;
    let event:any = {
      data: this.fnCreateObj(),
      fnOffSpinner: (success)=>{
        this.sending = false;
        if(this.button._resetOnSuccess && success){
          this.S2FormGroup.reset();
          this.S2FormGroup.markAsUntouched();
        }
      }
    }
    this.onSubmit.emit(event);
  }

  fnCreateObj():any{
    let data = {};
    this.groups.forEach(group=>{
      data[group._nameAs] = this.fnCreateGroup(group);
    });
    return data
  }
  
  fnCreateGroup(group:S2FormGroupModel):any{
    let data:any = {};
    group._items.forEach(item=>{
      if(item._config._type == 'group'){
        data[item._config._group._nameAs] = this.fnCreateGroup(item._config._group);
      }else{
        data[(item._renameAs)?(item._renameAs):(item._control)] = this.S2FormGroup.get(item._control).value;
      }
    });
    return data;
  }

  fnGetButtonText(): Observable<string> {
    let $button: BehaviorSubject<string> = new BehaviorSubject<string>('Button');
    if (this.button._text) {
      if(this.translate){
        this.fnTranslate(this.button._text,$button);
      }else{
        $button.next(this.button._text);
      }
    }
    return $button.asObservable();
  }

  fnTranslate(translate:string = 'no-data',$obs:BehaviorSubject<string>){
    this.translate.get(translate).subscribe(data=>{
      $obs.next(data);
    });
  }

}
