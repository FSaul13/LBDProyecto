import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sithec-suite-rank-question',
  templateUrl: './rank-question.component.html',
  styleUrls: ['./rank-question.component.css']
})
export class RankQuestionComponent implements OnInit {

  bln_showInfo: boolean = false;

  @Input() errorQuestion: string;
  @Input() errorOption: string;
  @Input() errorOptionConfig: string;

  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() id: string;

  @Input() translate: any;

  @Input() placeholder: string;

  @Input() addOption: string;


  @Input() titleModal: string;
  @Input() descModal: string;

  @Input() dragged: boolean;

  @Input() disabled:boolean;

  bln_show: boolean;

  files: any = {};

  str_questionPlaceholder: string = 'Pregunta';

  options: any[] = [];

  correctSelected: boolean;

  invalidQuestionText: boolean = false;
  invalidOptionText: boolean = false;
  invalidOptions: boolean = true;

  @Input() question: any;

  constructor() { }

  ngOnInit() {
    if (this.dragged) {
      this.str_questionPlaceholder = this.question.question;
      if(this.question.options){
        this.question.options.forEach(element => {
          element.option = element.stroption;
        });
      }
      this.options = this.question.options?this.question.options:[];
      
      this.bln_show = true;
      this.fnOnDragValidateFields();
      return;
    }
    this.fnCheckQuestionValidation();
    if (this.translate && this.placeholder) {
      this.translate.get(this.placeholder).subscribe(data => {
        this.str_questionPlaceholder = data;
        this.question.question = data;
        this.bln_show = true;
      });
    } else {
      this.question.question = this.str_questionPlaceholder;
      this.bln_show = true;
    }
  }

  fnDeleteQuestion(): void {
    this.delete.emit(this.id);
  }

  fnAddOption() {
    let recoverId = 'option-id' + this.id + '-index' + this.options.length;
    this.options.push({ option: '...', correct: false, stroption: '...', editable: false });
    this.fnCheckOptions();
  }

  fnPopOption(num_index: number) {
    if (this.options[num_index].correct) {
      this.correctSelected = false
    }
    this.options.splice(num_index, 1);
    this.fnCheckOptions();
  }

  fnSelectOption(index: number) {
    this.options.forEach(data => {
      data.correct = false;
    });
    this.options[index].correct = true;
    this.correctSelected = true;
    this.fnCheckOptions();
  }

  fnCheckOptions() {
    let valid: boolean = false;
    if (this.options.length >= 2) {
      this.invalidOptions = false;
    } else {
      this.invalidOptions = true;
    }

    //this.isValid.emit(valid)
    this.question.options = this.options;
    this.fnCheckQuestionValidation();
  }

  fnEditQuestion(event) {
    this.question.question = (event.target || event.srcElement).innerHTML;
    if (!this.question.question || this.question.question == '') {
      this.invalidQuestionText = true;
    } else {
      this.invalidQuestionText = false;
    }
    this.fnCheckQuestionValidation();
  }

  fnEditQuestionOption(event, option) {
    option.stroption = (event.target || event.srcElement).innerHTML;
    this.fnCheckValidOptions();
  }

  fnCheckValidOptions() {
    let valid: boolean = true;
    this.options.forEach(option => {
      if (!option.stroption && option.stroption == '') {
        valid = false;
      }
    });
    this.question.options = this.options;
    this.invalidOptionText = !valid;
    this.fnCheckQuestionValidation();
  }

  fnCheckQuestionValidation() {
    if (!this.invalidOptionText && !this.invalidQuestionText && !this.invalidOptions) {
      this.question.files = this.files;
      this.isValid.emit(true);
    } else {
      this.isValid.emit(false);
    }
  }

  fnGetTranslate(str_label): Observable<any> {
    let $translate: BehaviorSubject<string> = new BehaviorSubject<string>(str_label ? str_label : 'not-found');
    if (this.translate) {
      this.translate.get(str_label ? str_label : 'not-found').subscribe(data => {
        $translate.next(data);
      });
    }
    return $translate.asObservable();
  }

  fnSetCorrect(correct: boolean, option: any) {
    if(this.disabled){
      return;
    }
    this.options.forEach(data=>{
      data.correct = false;
    });
    option.correct = correct;
    this.fnCheckOptions();
  }

  fnShowInfoQuestion() {
    this.bln_showInfo = !this.bln_showInfo;
  }

  fnOnDragValidateFields(): void {
    if (!this.question.question || this.question.question == '') {
      this.invalidQuestionText = true;
    } else {
      this.invalidQuestionText = false;
    }
    if (this.options) {
      if (this.options.length >= 2) {
        this.invalidOptions = false;
      } else {
        this.invalidOptions = true;
      }
      let valid: boolean = true;
      this.options.forEach(option => {
        if (!option.stroption && option.stroption == '') {
          valid = false;
        }
      });
      this.invalidOptionText = !valid;
    } else {
      this.invalidOptions = true;
    }




    this.fnCheckQuestionValidation();
  }

  fnPopImage(str_key:string){
    delete this.files[str_key]
  }

}
