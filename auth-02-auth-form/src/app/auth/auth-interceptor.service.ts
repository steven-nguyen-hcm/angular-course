import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

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
      // catchError(this.handleErrorResponse.bind(this))
    );
  }

  private handleErrorResponse(err: any) {
    if (err instanceof HttpErrorResponse) {
      return this.handleHttpErrorByStatus(err.status);
    }
  }

  private handleHttpErrorByStatus(errStatus: number) {
    switch (errStatus) {
      case 401:
        return this.router.navigate(["/auth"]);
      default:
        return throwError("Unknow Error");
    }
  }
}
