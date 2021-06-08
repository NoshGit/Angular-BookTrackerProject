import { Component, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor(private logger: LoggerService, private dataService: DataService, private title: Title) { 
    logger.log(`Dashboard Constructor Loaded ${VERSION.full}`);
  }

  ngOnInit() {
    this.getAllBooks();
    this.title.setTitle(`Book Title - Dashbord`);

    this.dataService.getAllReaders().subscribe(
      (data: Reader[] | AppErrors) => this.allReaders = <Reader[]>data,
      (error:AppErrors) => this.logger.log(error.customMsg),
      () => this.logger.log('Get All Readers Observable Done!!!')
    );

    this.mostPopularBook = this.dataService.mostPopularBook;
    
    //this.getAutorrecommendationAsync(-1);
    
    this.dataService.getAuthorRecommendation(1)
    .then(
      (author:string) => {
        this.logger.log(`Recomended Author:${author}`)
        //throw new Error('There was something Wrong!!!');
      },
      (error:string) => this.logger.error(`This Promise was Rejected: ${error}`)
    )
    .catch((error:Error)=> this.logger.error(`From: Promise:${error.message}`))

    this.logger.log('Done With DashBoard Construction');

    throw new Error('Some this is Ugly');
    
  }

  /**Workng on Promise with Async and Await */

  /*private async getAutorrecommendationAsync(readerId:number): Promise<void>{
    try{
      let author:string = await this.dataService.getAuthorRecommendation(readerId);
      this.logger.log(`Recomended Author from Async:${author}`);
    }
    catch(error){
      this.logger.error(error);
    }
  } */

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
    .subscribe(
      ()=> {        
        let index: number = this.allBooks.findIndex(book => book.bookID === bookID)
        this.allBooks.splice(index, 1);
        console.log(`Book Deleted Successfully`);
      }
    )
  }

  getAllBooks(): void {
    this.dataService.getallBooks()
    .subscribe(
      (data:Book[]) => this.allBooks = data,
      err => console.log(err),
      () => this.logger.log('Getting All Books Completed')
    );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
