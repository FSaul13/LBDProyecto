import { Injectable, ViewChildren, ElementRef } from '@angular/core';
import { ColorPickerComponent } from './controls/color-picker/color-picker.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private $changeColor:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  _changeColor:Observable<any[]> = this.$changeColor;
  //{color:'#ffffff', id:'table-id'}

  private $tableCheckboxes:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  _tableCheckboxes:Observable<any[]> = this.$tableCheckboxes;
  /*{
    id:'table-id', 
    reference:'column-reference', 
    checked:['value1','value2',...], 
    reset:true|false
    addValues: [{},{},...],
    deleteColumns:['column-name','column-name']
  }*/

  private $initTable:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
  _initTable:Observable<any[]> = this.$initTable;
  
  constructor() { }
  
  fnChangeColor(color):void{
    let aux:any[] = this.$changeColor.getValue();
    let add:boolean = true;
    if(!color.id){
      add = false;
    }else{
      aux.forEach(data=>{
        if(data.id == color.id){
          add = false;
          data.color = color.color;
          data.set = true;
        }
      });
      if(add){
        color.set = true;
        aux.push(color);
      }
      this.$changeColor.next(aux);
    }
  }

  fnMarkColor(str_id:string):void{
    let aux:any[] = this.$changeColor.getValue();
    aux.forEach(data=>{
      if(data.id == str_id){
        data.set = false;
      }
    })
  }

  fnResetColros():void{
    this.$changeColor.next([]);
  }

  fnSelectInTable(table:any):void{
    let aux:any[] = this.$tableCheckboxes.getValue();
    let add:boolean = true;
    if(!table.id){
      add = false;
    }else{
      aux.forEach(data=>{
        if(data.id == table.id){
          add = false;
          if(table.reset){
            data.checked = (table.checked)?table.checked:[];
            data.addValues = (table.addValues)?table.addValues:[];
            data.deleteColumns = (table.deleteColumns)?table.deleteColumns:[];
          }else{
            data.checked.push(...(table.checked)?table.checked:[]);
            data.addValues.push(...(table.addValues)?table.addValues:[]);
            data.deleteColumns.push(...(table.deleteColumns)?table.deleteColumns:[]);
          }
          data.set = true;
        }
      });
      if(add){
        table.checked = (table.checked)?table.checked:[];
        table.set = true;
        aux.push(table);
      }
      console.log(aux)
      this.$tableCheckboxes.next(aux);
    }
    
  }

  fnMarkCheckbox(str_id:string):void{
    let aux:any[] = this.$tableCheckboxes.getValue();
    aux.forEach(data=>{
      if(data.id == str_id){
        data.set = false;
      }
    })
  }

  fnResetTable():void{
    console.log("reiniciar")
    this.$tableCheckboxes.next([]);
  }

  fnSetInitTable(str_idQuiz:string):void{
    let aux:any[] = this.$initTable.getValue();
    let bln_add:boolean = true;
    aux.forEach(data=>{
      if(data._id == str_idQuiz){
        data._check = false;
        bln_add = false;
      }
    });
    if(bln_add){
      aux.push({_id:str_idQuiz,_check:false});
    }
    this.$initTable.next(aux);
  }

  fnCheckInitTable(str_idQuiz:string):void{
    let quizAux:any[] = this.$initTable.getValue();
    quizAux.forEach(data=>{
      if(data._id == str_idQuiz){
        data._check = true;
      }
    });
    this.$initTable.next(quizAux);
  }
}
