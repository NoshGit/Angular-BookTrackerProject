import { Injectable } from "@angular/core";
import { AppErrors } from "app/models/app-errors";
import { Book } from "app/models/book";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataService } from "./data.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})

export class BookResolverService implements Resolve<Book[] | AppErrors> {
    
    constructor(private dataservice: DataService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Book[] | AppErrors | Observable<Book[] | AppErrors> | Promise<Book[] | AppErrors> {
        return this.dataservice.getallBooks()
        .pipe(
            catchError(err => of(err))
        );
    }
    
}