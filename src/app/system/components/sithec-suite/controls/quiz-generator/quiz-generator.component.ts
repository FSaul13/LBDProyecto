import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizSettingsModel } from '../../models/settings-quiz.model';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { SithecSuiteService } from '../../sithec-suite.service';
import { isObservable } from "rxjs";
import { S2SettingsFormGeneratorModel } from '../../models/s2-settings-form-generator.model';
import { S2FormGroupModel } from '../../models/s2-form-group.model';

@Component({
  selector: 'sithec-quiz-generator',
  templateUrl: './quiz-generator.component.html',
  styleUrls: ['./quiz-generator.component.scss']
})
export class QuizGeneratorComponent implements OnInit {

  num_idQuestion: number = 1;

  @Input() settings: QuizSettingsModel;

  form: S2SettingsFormGeneratorModel;

  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() onKeyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  title: string;
  date: string;

  questions: Question[] = [];

  questionStatus: any = {};

  bln_validQuiz: boolean;

  customData: any;

  private currentDraggableEvent: DragEvent;
  private currentDragEffectMsg: string;

  quiz_subscription: Subscription;

  constructor(
    private sithecSuite_tools: SithecSuiteService
  ) { }

  ngOnInit() {
    this.form = this.settings._form;
    if (this.form) {
      this.form._saveButton = null;
    }
    this.quiz_subscription = this.sithecSuite_tools._quiz.subscribe(data => {
      data.forEach(element => {
        if (element._id == this.settings._id && this.settings._id && !element._check) {
          this.sithecSuite_tools.fnCheckQuiz(this.settings._id);
          this.fnLoadQuiz(element);
        }
      });
    });
  }

  fnLoadQuiz(quiz): void {
    let auxQuiz: any;
    if (isObservable(quiz._quiz)) {
      auxQuiz = quiz._quiz.source['_value'];
    } else {
      auxQuiz = quiz._quiz;
    }
    this.customData = auxQuiz.customData;
    this.title = auxQuiz.title;
    console.log(auxQuiz)
    this.date = (auxQuiz.date) ? (auxQuiz.date.split('/').join('-')) : null;
    this.questionStatus = {};
    this.questions = [];
    let question: Question
    auxQuiz.questions.forEach(questionaux => {
      switch (questionaux.type) {
        case 'open':
          question = { type: 'open', id: this.num_idQuestion + '', dragged: true, question: questionaux.txtQuestion, customData: questionaux.customData } as Question;
          this.num_idQuestion++;
          this.questions.push(question);
          break;
        case 'unique':
        case 'multiple':
        case 'select':
        case 'rank':
          let auxOptions: any[] = [];
          questionaux.options.forEach(data => {
            auxOptions.push({
              customData: data.customData,
              option: data.option,
              stroption: data.option,
              correct: (data.correct) ? data.correct : false,
              editable: (data.editable) ? data.editable : false
            });
          });
          question = { type: (questionaux.type == 'unique') ? 'options' : questionaux.type, id: this.num_idQuestion + '', dragged: true, question: questionaux.txtQuestion, options: auxOptions, customData: questionaux.customData } as Question;
          this.num_idQuestion++;
          this.questions.push(question);
          break;
        case 'query':
          question = { type: 'query', id: this.num_idQuestion + '', dragged: true, question: questionaux.txtQuestion, query: questionaux.txtQuery, customData: questionaux.customData } as Question;
          this.num_idQuestion++;
          this.questions.push(question);
          break;
        case 'raiting':
          question = { type: 'rank', id: this.num_idQuestion + '', dragged: true, question: questionaux.txtQuestion, customData: questionaux.customData } as Question;
          this.num_idQuestion++;
          this.questions.push(question);
          break;
      }
    });
  }

  ngOnDestroy() {
    if (this.quiz_subscription) {
      this.quiz_subscription.unsubscribe();
    }
  }

  fnDeleteQuestion(event): void {
    if (event) {
      let index: number = -1;
      let count: number = 0;
      this.questions.forEach(data => {
        if (data.id == event) {
          index = count;
        }
        count++;
      });
      if (index != -1) {
        delete this.questionStatus[this.questions[index].id];
        this.questions.splice(index, 1);
        this.fnCheckQuizValidations();
      }
    }
  }

  fnAddOpenQuestion(): void {
    let question: Question = { type: 'open', id: this.num_idQuestion + '', dragged: false } as Question;
    this.num_idQuestion++;
    this.questions.push(question);
    this.questionStatus[question.id] = true;
  }

  fnAddOptionsQuestion(): void {
    let question: Question = { type: 'options', id: this.num_idQuestion + '', dragged: false } as Question;
    this.num_idQuestion++;
    this.questions.push(question);
    this.questionStatus[question.id] = false;
  }

  fnAddOptionsMultipleQuestion(): void {
    let question: Question = { type: 'multiple', id: this.num_idQuestion + '', dragged: false } as Question;
    this.num_idQuestion++;
    this.questions.push(question);
    this.questionStatus[question.id] = false;
  }

  fnAddQueryQuestion() {
    let question: Question = { type: 'query', id: this.num_idQuestion + '', dragged: false } as Question;
    this.num_idQuestion++;
    this.questions.push(question);
    this.questionStatus[question.id] = false;
  }

  fnAddSelectQuestion() {
    let question: Question = { type: 'select', id: this.num_idQuestion + '', dragged: false } as Question;
    this.num_idQuestion++;
    this.questions.push(question);
    this.questionStatus[question.id] = false;
  }

  fnAddRaitingQuestion() {
    let question: Question = { type: 'raiting', id: this.num_idQuestion + '', dragged: false } as Question;
    this.num_idQuestion++;
    this.questions.push(question);
    this.questionStatus[question.id] = true;
  }

  fnAddRankQuestion() {
    let question: Question = { type: 'rank', id: this.num_idQuestion + '', dragged: false } as Question;
    this.num_idQuestion++;
    this.questions.push(question);
    this.questionStatus[question.id] = false;
  }

  fnGetTranslate(str_label): Observable<any> {
    let $translate: BehaviorSubject<string> = new BehaviorSubject<string>(str_label);
    if (this.settings._translate) {
      this.settings._translate.get(str_label ? str_label : 'not-found').subscribe(data => {
        $translate.next(data);
      });
    }
    return $translate.asObservable();
  }

  fnIsValid(event, id) {
    this.questionStatus[id] = event;
    this.fnCheckQuizValidations();
  }

  fnCheckQuizValidations() {
    let validQuiz: boolean = true;
    Object.keys(this.questionStatus).forEach(key => {
      if (!this.questionStatus[key]) {
        validQuiz = false;
      }
    });
    if (Object.keys(this.questionStatus).length > 0) {
      if (this.form) {
        if (this.form._formGroup.invalid) {
          this.bln_validQuiz = false;
        } else {
          this.bln_validQuiz = true;
        }
      } else {
        this.bln_validQuiz = validQuiz;
      }

    } else {
      this.bln_validQuiz = false;
    }

  }

  bln_spinner: boolean = false;
  fnSaveQuiz() {
    if (this.bln_spinner) {
      return;
    }
    this.bln_spinner = true;
    let event = {
      quiz: this.fnCreateObject(),
      fnOffSpinner: (bln_success: boolean) => {
        this.bln_spinner = false;
        if (!bln_success) {
          return;
        }
        if (this.settings._resetOnSave) {
          if(this.form){
            this.form._formGroup.reset();
          }
          this.title = "";
          this.date = "";
          this.questionStatus = {};
          this.questions = [];
        }
        this.fnCheckQuizValidations();
      }
    }
    this.onSave.emit(event)
  }

  fnCreateObject(): any {
    let questionsAux: any[] = JSON.parse(JSON.stringify(this.questions));
    let returnQuestions: any[] = [];
    let index: number = 1;
    questionsAux.forEach(question => {
      let addQuestion: any = {
        customData: question.customData,
        type: (question.type == 'options') ? 'unique' : question.type,
        txtQuestion: question.question,
        index: index,
        files: question.files
      }
      index++;
      if (question.type == 'options' || question.type == 'multiple' || question.type == 'rank' || question.type == 'select') {
        let hasCorrectAnswer: boolean = false;
        let returnOptions: any[] = [];
        question.options.forEach(option => {
          if (option.correct) {
            hasCorrectAnswer = true;
          }
          let addOption = {
            customData: option.customData,
            editable: option.editable,
            txtOption: option.stroption,
            isCorrect: option.correct
          }
          returnOptions.push(addOption);
        });
        addQuestion.hasCorrectAnswer = hasCorrectAnswer;
        addQuestion.options = returnOptions;
        addQuestion.customData = question.customData;
      } else if (question.type == 'query') {
        addQuestion.sql = question.query;
      }
      returnQuestions.push(addQuestion);
    });
    let quiz = { questions: returnQuestions, title: this.title, date: this.date, customData: this.customData, form: this.fnCreateFormObj() };
    return quiz;
  }

  onDragStart(event: DragEvent) {

    this.currentDragEffectMsg = "";
    this.currentDraggableEvent = event;
  }

  onDragged(item: any, list: any[], effect: DropEffect) {

    this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;

    if (effect === "move") {

      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragEnd(event: DragEvent) {
    this.currentDraggableEvent = event;
  }

  onDrop(event: DndDropEvent, list?: any[]) {

    if (list
      && (event.dropEffect === "copy"
        || event.dropEffect === "move")) {

      let index = event.index;

      if (typeof index === "undefined") {

        index = list.length;
      }

      event.data.dragged = true;
      list.splice(index, 0, event.data);
    }
  }

  fnKeyup(event) {
    this.onKeyup.emit(event);
    this.fnCheckQuizValidations();
  }

  fnChange(event) {
    this.onChange.emit(event);
    this.fnCheckQuizValidations();
  }

  fnCreateFormObj(): any {
    let data = {};
    if (this.form) {
      this.form._groups.forEach(group => {
        data[group._nameAs] = this.fnCreateGroup(group);
      });
    }

    return data
  }

  fnCreateGroup(group: S2FormGroupModel): any {
    let data: any = {};
    group._items.forEach(item => {
      if (item._config._type == 'group') {
        data[item._config._group._nameAs] = this.fnCreateGroup(item._config._group);
      } else {
        data[(item._renameAs) ? (item._renameAs) : (item._control)] = this.form._formGroup.get(item._control).value;
      }
    });
    return data;
  }

}


class Question {
  type: string;
  question: string;
  id: string;
  options: any[];
  dragged: boolean;
  queryOptions: any[];
  query: string;
  files: any;
  customData: any;
}