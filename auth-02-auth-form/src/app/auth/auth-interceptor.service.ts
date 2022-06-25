import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.$userSubject.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(req);
        }

        req.headers.set("auth", user.token);
        const modifiedReq = req.clone({
          params: req.params.append("auth", user.token),
        });
        return next.handle(modifiedReq);
      }),
      tap((event: any) => {
          console.log(event);

        // if (event.type === HttpEventType.Response) {
        //   console.log(event);
        // }
      })
    );
  }
}
