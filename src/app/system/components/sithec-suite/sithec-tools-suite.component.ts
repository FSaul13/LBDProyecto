import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SettingsCollapseTable } from './models/settings-collapseTable.model';
import { ColumnsCollapseTable } from './models/column-callapseTable.model';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ButtonTableMode } from './models/buttons-table.model';

@Component({
  selector: 'sithec-suite',
  templateUrl: './sithec-tools-suite.component.html',
  styleUrls: ['./sithec-tools-suite.component.css']
})
export class CollapseTableComponent implements OnInit {

  @Input() settings:any;
  @Input() tool:string;

  @Output() onClickButton:EventEmitter<any> = new EventEmitter<any>();
  @Output() onOpenTableChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() onClickInitFilter:EventEmitter<any> = new EventEmitter<any>();

  @Output() onKeyup:EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmit:EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange:EventEmitter<any> = new EventEmitter<any>();

  @Output() clickSavebutton:EventEmitter<any> = new EventEmitter<any>();
  
  constructor() {
    
  }

  ngOnInit() {
   
  }

  fnEmitTableButtonEvent(event):void{
    this.onClickButton.emit(event);
  }

  fnEmitTableChangeEvent(event):void{
    this.onOpenTableChange.emit(event);
  }

  fnEmitInitFilters(event){
    this.onClickInitFilter.emit(event);
  }

  fnEmitSave(event){
    this.clickSavebutton.emit(event);
  }

  fnEmitKeyup(event):void{
    this.onKeyup.emit(event)
  }

  fnEmitChange(event):void{
    this.onChange.emit(event)
  }

  fnEmitSubmit(event):void{
    this.onSubmit.emit(event)
  }

}
