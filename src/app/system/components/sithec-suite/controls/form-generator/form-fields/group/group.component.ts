import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { S2FormGroupModel } from 'app/system/components/sithec-suite/models/s2-form-group.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormGroup } from '@angular/forms';
import { S2FormGroupItemModel } from 'app/system/components/sithec-suite/models/s2-form-group-item.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 's2-form-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() group: S2FormGroupModel
  @Input() S2FormGroup: FormGroup;
  @Input() translate: any;

  @Output() onKeyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() sending:boolean;

  defaultColumns = {
    _xl: { text: 6, number: 6, password: 6, date: 6, select: 6 },
    _lg: { text: 6, number: 6, password: 6, date: 6, select: 6 },
    _md: { text: 6, number: 6, password: 6, date: 6, select: 6 },
    _sm: { text: 12, number: 12, password: 12, date: 12, select: 12 },
    _xs: { text: 12, number: 12, password: 12, date: 12, select: 12 }
  }


  constructor() { }

  ngOnInit() {
  }

  fnGetColumnSize(item: S2FormGroupItemModel, size: string) {
    
    switch (item._config._type) {
      case 'text':
      case 'number':
      case 'password':
      case 'date':
        if (item._config._input._columns) {
          if (item._config._input._columns[size] > 0 && item._config._input._columns[size] < 13) {
            return '' + item._config._input._columns[size];
          }
        }
        return this.defaultColumns[size][item._config._type];
      case 'select':
        if (item._config._select._columns) {
          if (item._config._select._columns[size] > 0 && item._config._select._columns[size] < 13) {
            return '' + item._config._select._columns[size];
          }
        }
        return this.defaultColumns[size][item._config._type];
      case 'group':
        return '12';
    }
    return '12'
  }

  fnGetGroupTitle(): Observable<string> {
    let $title: BehaviorSubject<string> = new BehaviorSubject<string>('Group title');
    if (this.group._title) {
      if (this.translate) {
        this.fnTranslate(this.group._title, $title);
      } else {
        $title.next(this.group._title);
      }
    }
    return $title.asObservable();
  }

  fnTranslate(translate: string = 'no-data', $obs: BehaviorSubject<string>) {
    this.translate.get(translate).subscribe(data => {
      $obs.next(data);
    });
  }

  fnChange(event){
    this.onChange.emit(event);
  }

  fnKeyup(event){
    this.onKeyup.emit(event);
  }

}
