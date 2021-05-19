import { Injectable } from '@angular/core';

@Injectable()
export class BadgeService {

  constructor() { }

  setReadersBadge(minutes: number): string {
    if(minutes < 5000){
      return 'Book Worm';
    }else if(minutes < 2500){
      return 'Page Turner';
    }else{
      return 'Getting Started';
    }
  }
}
