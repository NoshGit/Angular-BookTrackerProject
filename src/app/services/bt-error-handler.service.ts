import { ErrorHandler, Injectable } from '@angular/core';
import { AppErrors } from 'app/models/app-errors';

@Injectable()
export class BtErrorHandlerService implements ErrorHandler {

  constructor() { }
  handleError(error: any): void {
    var catchError:AppErrors={
      errorNumber:500,
      message:(<Error>error).message,
      customMsg:'Oops!!!Looks Like Something in Application is Wrong'
    }

    console.log(catchError);
  }
}
