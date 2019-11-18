import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sithec-suite-raiting-question',
  templateUrl: './raiting-question.component.html',
  styleUrls: ['./raiting-question.component.css']
})
export class RaitingQuestionComponent implements OnInit {

  bln_showInfo:boolean = false;

  

  @Input() errorQuestion:string;
  

  @Output() delete:EventEmitter<any> = new EventEmitter<any>();

  @Output() isValid:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() id:string;

  @Input() translate:any;

  @Input() placeholder:string;

  @Input() titleModal:string;
  @Input() descModal:string;

  @Input() dragged:boolean;

  @Input() disabled:boolean;

  bln_show:boolean;

  files:any = {};

  str_questionPlaceholder:string = '...';

  invalidQuestionText:boolean;

  @Input() question:any;

  constructor() { }

  ngOnInit() {
    
    if(this.dragged){
      this.str_questionPlaceholder = this.question.question;
      this.bln_show = true;
      this.fnOnDragValidateFields();
      return;
    }
    this.question.files = this.files;
    this.isValid.emit(true);
    if(this.translate && this.placeholder){
      this.translate.get(this.placeholder).subscribe(data=>{
        this.str_questionPlaceholder = data;
        this.question.question = data;
        this.bln_show = true;
      });
    }else{
      this.question.question = this.str_questionPlaceholder;
      this.bln_show = true;
    }
  }

  fnDeleteQuestion():void{
    this.delete.emit(this.id);
  }

  fnEditQuestion(event){
    this.question.question = (event.target || event.srcElement).innerHTML;
    if(!this.question.question || this.question.question == ''){
      this.invalidQuestionText = true;
      this.isValid.emit(false)
    }else{
      this.invalidQuestionText = false;
      this.question.files = this.files;
      this.isValid.emit(true)
    }
  }
  
  fnGetTranslate(str_label):Observable<any>{
    let $translate:BehaviorSubject<string> = new BehaviorSubject<string>(str_label ? str_label : 'not-found');
    if(this.translate){
      this.translate.get(str_label?str_label:'not-found').subscribe(data=>{
        $translate.next(data);
      });
    }
    return $translate.asObservable();
  }

  fnShowInfoQuestion(){
    this.bln_showInfo = !this.bln_showInfo;
  }

  fnOnDragValidateFields():void{
    if(!this.question.question || this.question.question == ''){
      this.invalidQuestionText = true;
      this.isValid.emit(false)
    }else{
      this.invalidQuestionText = false;
      this.question.files = this.files;
      this.isValid.emit(true)
    }
  }

  fnPopImage(str_key:string){
    delete this.files[str_key]
  }

}
