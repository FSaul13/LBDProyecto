import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { LightboxModule } from 'ngx-lightbox';
import { FullCalendarModule } from 'ng-fullcalendar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FeedbackService } from './system/services/feedback.service';
import { SpinnerModule } from './layout/spinner/spiner.module';
import { SessionService } from './system/services/session.service';
import { HTTPInterceptorService } from './system/services/http.interceptor';
import { ApiCallService } from './system/services/api-call.service';
import { AuthenticacionService } from './system/services/authenticacion.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    routing,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
    LightboxModule,
    FullCalendarModule,
    SpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ApiCallService,
    AuthenticacionService,
    FeedbackService,
    SessionService,
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
