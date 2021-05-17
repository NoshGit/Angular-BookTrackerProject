import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
  providers: [
    /*{provide: DataService, useClass: DataService},    
    {provide: LoggerService, useValue:{
      log: (message:string)=> console.log('MESSAGE:', message),
      error: (message:string)=> console.error('ERROR:', message)
    }},
    {provide: DataService, useFactory: dataFactoryService, deps:[LoggerService]}, */ 
    LoggerService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
