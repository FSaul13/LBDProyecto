import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable()
export class HTTPInterceptorService implements HttpInterceptor {
    constructor(
        private srv_session: SessionService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //let str_browserLanguage = this.srv_session.fnGetLanguage();
        //let str_token:string = localStorage.getItem("sessionToken")?localStorage.getItem("sessionToken"):"";
        //req = req.clone({
        //  setHeaders: {
        //      "sessionToken": str_token
        //}
        //});

        return next.handle(req);
    }
}