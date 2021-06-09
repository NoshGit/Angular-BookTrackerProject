import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allBooks, allReaders } from 'app/data';
import { AppErrors } from 'app/models/app-errors';
import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { Reader } from 'app/models/reader';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class DataService {

  constructor(private logger: LoggerService, private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  getAllReaders(): Observable <Reader[] | AppErrors> {
    return this.http.get<Reader[]>('/api/readers')
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<AppErrors>{
    let dataError : AppErrors = new AppErrors();
    
    dataError.errorNumber= 500;
    dataError.message= error.statusText;
    dataError.customMsg= 'There is some issue with Server, Please try later!!!';
      
    return throwError(dataError);
  }

  /**Promise Example */

  getAuthorRecommendation(id:number): Promise<string> {
    return new Promise((resolve, reject)=> {
      setTimeout(()=>{
        if(id > 0){
          resolve('Dr. Zeus');
        }else{
          reject('Invalid Reader ID');
        }
      }, 2000);
    });
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }
  
  getallBooks(): Observable<Book[] | AppErrors> {
    this.logger.log('Getting All Books from Server');
    return this.http.get<Book[]>('/api/books')
    .pipe(
      catchError(this.handleError)
    );
  }

  getBookById(id: number): Observable<Book>{
    this.logger.log(`Getting Books #${id} from Server`);
    let getHeader: HttpHeaders = new HttpHeaders({
      'Accept':'application/json',
      'Autorization': 'Bearer my-token'
    });

    return this.http.get<Book>(`/api/books/${id}`, {
      headers: getHeader
    });
  }

  getOldBook(id:number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`)
    .pipe(
      map(book => <OldBook>{
        bookTitle: book.title,
        year: book.publicationYear
      }),
      tap(oldbook => console.log('Classic Book', oldbook))
    );
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', book, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    });
  }

  updateBook(book: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${book.bookID}`, book, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    });
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookID}`);
  }

}
