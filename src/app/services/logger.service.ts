import { Injectable } from "@angular/core";

@Injectable(/*{
    providedIn: 'root'
}*/)

export class LoggerService {
    log(message: any): void{
        const time: string = new Date().toLocaleTimeString();
        console.log(`${message} (${time})`);
    }

    error(message:any, message2?:any): void {
        console.error(`ERROR: ${message} ${message2}`);
    }
}