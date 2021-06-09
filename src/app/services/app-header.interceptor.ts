import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

Injectable()
export class AppHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Header Interceptor Url: ${req.url}`);

        let currReq: HttpRequest<any> =  req.clone({
            setHeaders: {'Content-type':'application/json'}
        });

        return next.handle(currReq);
    }

}