import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spiner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  bln_show:boolean=false;

  constructor(
    private srv_spinner:SpinnerService
  ) { }

  ngOnInit() {
    this.srv_spinner._blnIsOn.subscribe(bln_value=>{
      this.bln_show = bln_value
    })
  }

}
