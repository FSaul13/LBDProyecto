import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SithecSuiteService {

  $spinner:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  _spinner:Observable<any> = this.$spinner.asObservable();

  $rows:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  _rows:Observable<any> = this.$rows.asObservable();

  $quiz:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  _quiz:Observable<any> = this.$quiz.asObservable();

  constructor() { }

  fnOnSpinner(str_idTable:string):void{
    let spinnerAux:any[] = this.$spinner.getValue();
    let bln_add:boolean = true;
    spinnerAux.forEach(data=>{
      if(data._id == str_idTable){
        data._state = true;
        data._check = false;
        bln_add = false;
      }
    });
    if(bln_add){
      spinnerAux.push({_id:str_idTable,_state:true,_check:false});
    }
    this.$spinner.next(spinnerAux);
  }

  fnOffSpinner(str_idTable:string):void{
    let spinnerAux:any[] = this.$spinner.getValue();
    let bln_add:boolean = true;
    spinnerAux.forEach(data=>{
      if(data._id == str_idTable){
        data._state = false;
        data._check = false;
        bln_add = false;
      }
    });
    if(bln_add){
      spinnerAux.push({_id:str_idTable,_state:false,_check:false});
    }
    this.$spinner.next(spinnerAux);
  }

  fnCheckSpinner(str_idTable:string):void{
    let spinnerAux:any[] = this.$spinner.getValue();
    spinnerAux.forEach(data=>{
      if(data._id == str_idTable){
        data._check = true;
      }
    });
    this.$spinner.next(spinnerAux);
  }

  fnResetSpinner():void{
    this.$spinner.next([]);
  }

  fnSetRows(str_idTable:string,rows:any[]|Observable<any[]>):void{
    let rowsAux:any[] = this.$rows.getValue();
    let bln_add:boolean = true;
    rowsAux.forEach(data=>{
      if(data._id == str_idTable){
        data._rows = rows;
        data._check = false;
        bln_add = false;
      }
    });
    if(bln_add){
      rowsAux.push({_id:str_idTable,_rows:rows,_check:false});
    }
    this.$rows.next(rowsAux);
  }

  fnCheckRows(str_idTable:string):void{
    let rowsAux:any[] = this.$rows.getValue();
    rowsAux.forEach(data=>{
      if(data._id == str_idTable){
        data._check = true;
      }
    });
    this.$rows.next(rowsAux);
  }

  fnSetQuiz(str_idQuiz:string,quiz:any|Observable<any>):void{
    let quizAux:any[] = this.$quiz.getValue();
    let bln_add:boolean = true;
    quizAux.forEach(data=>{
      if(data._id == str_idQuiz){
        data._quiz = quiz;
        data._check = false;
        bln_add = false;
      }
    });
    if(bln_add){
      quizAux.push({_id:str_idQuiz,_quiz:quiz,_check:false});
    }
    this.$quiz.next(quizAux);
  }

  fnCheckQuiz(str_idQuiz:string):void{
    let quizAux:any[] = this.$quiz.getValue();
    quizAux.forEach(data=>{
      if(data._id == str_idQuiz){
        data._check = true;
      }
    });
    this.$quiz.next(quizAux);
  }

  fnResetRows():void{
    this.$rows.next([]);
  }

}
