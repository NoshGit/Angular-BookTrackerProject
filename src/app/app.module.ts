import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AddBookComponent } from './add-book/add-book.component';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import { DataService } from './services/data.service';
import { LoggerService } from './services/logger.service';
import { dataFactoryService } from './services/data.service.factory';
import { BtErrorHandlerService } from './services/bt-error-handler.service';
import { AppHeaderInterceptor } from './services/app-header.interceptor';
import { LogRequestInterceptor } from './services/log-request.interceptor';
import { CacheInterceptor } from './services/cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddBookComponent,
    EditReaderComponent,
    EditBookComponent,
    AddReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    /*{provide: DataService, useClass: DataService},    
    {provide: LoggerService, useValue:{
      log: (message:string)=> console.log('MESSAGE:', message),
      error: (message:string)=> console.error('ERROR:', message)
    }},
    {provide: DataService, useFactory: dataFactoryService, deps:[LoggerService]}, */ 
    LoggerService,
    DataService,
    {provide: ErrorHandler, useClass: BtErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: AppHeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LogRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
