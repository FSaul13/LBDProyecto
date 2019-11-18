import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'query-question',
  templateUrl: './query-question.component.html',
  styleUrls: ['./query-question.component.css']
})
export class QueryQuestionComponent implements OnInit {

  queryOptions: DatosSqlDto[];

  bln_showInfo: boolean = false;

  @Input() errorQuestion: string;
  @Input() errorQuery: string;


  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() id: string;

  @Input() translate: any;

  @Input() placeholder: string;

  @Input() api: string;

  @Input() titleModal: string;
  @Input() descModal: string;

  @Input() queryButton: string;
  @Input() errorInvalidQuery: string;

  @Input() dragged: boolean;

  @Input() disabled:boolean;

  bln_show: boolean;

  files: any = {};

  str_questionPlaceholder: string = '...';
  str_queryPlaceholder: string = 'query';

  invalidQuestionText: boolean = false;
  invalidQuery: boolean = false;

  bln_recoverOptions: boolean;

  @Input() question: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (this.dragged) {
      this.str_questionPlaceholder = this.question.question;
      this.question.query = this.question.query?this.question.query:'query';
      this.str_queryPlaceholder = (this.question.query);
      this.queryOptions =  this.question.queryOptions;
      this.bln_show = true;
      this.fnOnDragValidateFields();
      return;
    }
    this.isValid.emit(false);
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

  fnEditQuestion(event) {
    this.question.question = (event.target || event.srcElement).innerHTML;
    if (!this.question.question || this.question.question == '') {
      this.invalidQuestionText = true;
    } else {
      this.invalidQuestionText = false;
    }
    this.fnCheckQuestionValid();
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

  fnEditQuery(event) {
    let query = (event.target || event.srcElement).innerHTML;
    this.question.query = query;
    if (!this.question.query || this.question.query == '') {
      this.invalidQuery = true;
    } else {
      this.invalidQuery = false;
    }
    this.fnCheckQuestionValid();
  }

  fnCheckQuestionValid() {
    if (!this.invalidQuery && !this.invalidQuestionText && this.bln_recoverOptions) {
      this.question.files = this.files;
      this.isValid.emit(true)
    } else {
      this.isValid.emit(false)
    }
  }

  fnShowInfoQuestion() {
    this.bln_showInfo = !this.bln_showInfo;
  }

  fnTryQuery() {
    this.http.post(this.api, { _query: this.question.query }).toPromise()
      .then((res: DatosSqlDto[]) => {
        if (res.length > 0) {
          this.bln_recoverOptions = true;
        } else {
          this.bln_recoverOptions = false;
        }
        this.queryOptions = res;
        this.question.queryOptions = this.queryOptions;
        this.fnCheckQuestionValid();
      })
      .catch(rej => {
        this.bln_recoverOptions = false;
        this.queryOptions = [];
        this.fnCheckQuestionValid();
        console.log(rej)
      });
  }

  fnOnDragValidateFields(): void {
    if (!this.question.question || this.question.question == '') {
      this.invalidQuestionText = true;
    } else {
      this.invalidQuestionText = false;
    }
    if (!this.question.query || this.question.query == '') {
      this.invalidQuery = true;
    } else {
      this.invalidQuery = false;
    }
    let valid = false;
    if(this.queryOptions){
      if(this.queryOptions.length>1){
        valid = true;
      }
    }
    this.bln_recoverOptions = valid


    this.fnCheckQuestionValid();
  }

  fnPopImage(str_key:string){
    delete this.files[str_key]
  }

}

class DatosSqlDto {
  _id: number;
  _value: string;
}
