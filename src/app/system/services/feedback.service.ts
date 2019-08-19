import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class FeedbackService {

  constructor(
    private toastr: ToastrService
  ) { }

  fnErrorNotification(str_message:string):void{
    this.toastr.error(str_message,undefined,{
      closeButton:true,
      positionClass:'toast-top-right'
    });
  }

  fnErrorConnectionNotification():void{
    this.toastr.error('Error de conexion con el servidor',undefined,{
      closeButton:true,
      positionClass:'toast-top-right'
    });
  }

  fnSuccessNotification(str_message:string):void{
    this.toastr.success(str_message,undefined,{
      closeButton:true,
      positionClass:'toast-top-right'
    });
  }

  fnWarningNotification(str_message:string){
    this.toastr.warning(str_message,undefined,{
      closeButton:true,
      positionClass:'toast-top-right'
    });
  }

  fnInfoNotification(str_message:string){
    this.toastr.info(str_message,undefined,{
      closeButton:true,
      positionClass:'toast-top-right'
    });
  }


}
