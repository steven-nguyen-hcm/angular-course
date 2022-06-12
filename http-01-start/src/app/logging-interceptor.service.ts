import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(tap((event: any) => {
      console.log('Outgoing request: ', req.url);
      if (event.type === HttpEventType.Response) {
        console.log("Incoming response", event.body);
      }
    }));
  }
}