import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { DataService } from 'app/services/data.service';
import { LoggerService } from 'app/services/logger.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute, private dataService: DataService,
    private logger: LoggerService
    ) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookID)
    .subscribe(
      (data:Book) => this.selectedBook = data,
      err => console.error('Loggin Get Book Error', err)
    );

    this.dataService.getOldBook(bookID).subscribe(
      (data:OldBook) => this.logger.log(`Old Book Tile: ${data.bookTitle}`)
    )
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
    this.logger.log(`New Most Popular Book "${this.selectedBook.title}"`)
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook)
    .subscribe(
      () => this.logger.log(`${this.selectedBook.title} has been updated successfully`),
      (err:any) => this.logger.error('Update Book Error',err)
    )
  }
}
