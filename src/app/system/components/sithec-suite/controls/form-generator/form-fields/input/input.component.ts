import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 's2-form-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() S2FormControl:FormControl;
  @Input() S2FormGroup:FormGroup;
  @Input() placeholder:string = 'placeholder';
  @Input() label:string = 'label';
  @Input() id:string = 'default-id';
  @Input() colum:string = '6';
  @Input() type:string;
  @Input() translate:any;

  @Input() sending:boolean;


  @Output() onKeyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  fnKeyup(event):void{
    let emitEvent = {id:this.id,event:event};
    this.onKeyup.emit({id:this.id,event:emitEvent})
  }

  fnChange(event):void{
    let emitEvent = {id:this.id,event:event};
    this.onChange.emit(emitEvent)
  }

  fnGetInputLabel(): Observable<string> {
    let $label: BehaviorSubject<string> = new BehaviorSubject<string>('Label');
    if (this.label) {
      if(this.translate){
        this.fnTranslate(this.label,$label);
      }else{
        $label.next(this.label);
      }
    }
    return $label.asObservable();
  }

  fnGetInputPlaceholder(): Observable<string> {
    let $placeholder: BehaviorSubject<string> = new BehaviorSubject<string>('Placeholder');
    if (this.placeholder) {
      if(this.translate){
        this.fnTranslate(this.placeholder,$placeholder);
      }else{
        $placeholder.next(this.placeholder);
      }
    }
    return $placeholder.asObservable();
  }

  fnTranslate(translate:string = 'no-data',$obs:BehaviorSubject<string>){
    this.translate.get(translate).subscribe(data=>{
      $obs.next(data);
    });
  }

}
