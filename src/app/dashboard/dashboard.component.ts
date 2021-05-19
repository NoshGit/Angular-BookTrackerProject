import { Component, OnInit } from '@angular/core';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { LoggerService } from 'app/services/logger.service';
import { DataService } from 'app/services/data.service';
import { AppErrors } from 'app/models/app-errors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private logger: LoggerService, private dataService: DataService) { 
    logger.log('Dashboard Constructor Loaded');
  }

  ngOnInit() {
    this.allBooks = this.dataService.getallBooks();
    this.dataService.getAllReaders()
    .subscribe(
      (data: Reader[] | AppErrors) => this.allReaders = <Reader[]>data,
      (error:AppErrors) => this.logger.log(error.customMsg),
      () => this.logger.log('Get All Readers Observable Done!!!')
    );
    this.mostPopularBook = this.dataService.mostPopularBook;
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
