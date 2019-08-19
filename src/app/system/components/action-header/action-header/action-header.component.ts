import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { HeaderSettings } from '../action-header-models/header-settings.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-action-header',
  templateUrl: './action-header.component.html',
  styleUrls: ['./action-header.component.css']
})
export class ActionHeaderComponent implements OnInit {

  @Input() settings:HeaderSettings;
  @Output() eventEmmiter_extraButtonClick:EventEmitter<any> = new EventEmitter<any>();


  bln_returnButton:boolean = false;
  str_returnButtonAlign:string = "flex-row";
  str_backIcon:string = "fas fa-arrow-circle-left"

  str_actionsButtons:string = "flex-row";
  bln_extraButtons:boolean = false;

  buttons:any[];

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
    if(this.settings.iconBackButton){
      this.str_backIcon = this.settings.iconBackButton;
    }
    if(this.settings.extraButtons){
      this.buttons = this.settings.buttons ? this.settings.buttons : [];
    }
    this.bln_returnButton = this.settings.backButton;
    this.bln_extraButtons = this.settings.extraButtons;
    if(this.settings.alignBackButton=="start"){
      this.str_returnButtonAlign = "flex-row";
    }else if(this.settings.alignBackButton=="end"){
      this.str_returnButtonAlign = "flex-row-reverse";
    }
    if(this.settings.alignExtraButtons=="start"){
      this.str_actionsButtons = "flex-row";
    }else if(this.settings.alignExtraButtons=="end"){
      this.str_actionsButtons = "flex-row-reverse";
    }
  }

  fnGoBack():void{
    this.location.back();
  }

  fnExtraButtonClick(button:any):void{
    this.eventEmmiter_extraButtonClick.emit(button.id);
  }

}
