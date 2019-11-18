import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header-question',
  templateUrl: './header-question.component.html',
  styleUrls: ['./header-question.component.css']
})
export class HeaderQuestionComponent implements OnInit {

  @Input() files:any;
  @Input() disabled:boolean;
  @Output() deleteQuestion:EventEmitter<any> = new EventEmitter<any>();
  @Output() infoQuestion:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  fnAddFile(){
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.png,.jpeg';
    input.multiple = true;
    input.onchange = (event)=>{
      this.fnAddImages(event);
    }
    input.click();
  }

  fnAddImages(event){
    let files = event.path[0].files;
    let keys:string[] = Object.keys(event.path[0].files);
    keys.forEach(key=>{
      this.fnGetBase64(files[key]);
    })
  }

  fnGetBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        
        this.files[reader.result+''] = file;
        resolve()
      };
      reader.onerror = error => {
        reject()
      };
    });
  }

  fnPopImage(str_key:string){
    delete this.files[str_key]
  }

  fnDeleteQuestion():void{
    this.deleteQuestion.emit();
  }

  fnShowInfo(){
    this.infoQuestion.emit();
  }

}
