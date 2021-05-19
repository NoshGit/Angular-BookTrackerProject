import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { AppErrors } from 'app/models/app-errors';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class DataService {

  constructor(private logger: LoggerService, private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  getAllReaders(): Observable <Reader[] | AppErrors> {
    return this.http.get<Reader[]>('/api/error/500')
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<AppErrors>{
    let dataError : AppErrors ={
      errorNumber: 500,
      message: error.statusText,
      customMsg: 'There is some issue with Server, Please try later!!!'
    }
    
    return throwError(dataError);
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }
  
  getallBooks(): Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

}
