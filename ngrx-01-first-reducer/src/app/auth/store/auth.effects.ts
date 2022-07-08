import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../auth.service";
import * as AuthActions from "./auth.action";

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.action$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((action: AuthActions.LoginStart) => {
      const authData = action.payload;
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            environment.firebaseAPIKey,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          switchMap((resData: any) => {
            console.log(resData);

            const expirationDate = new Date(
              new Date().getTime() + resData.expiresIn * 1000
            );
            return of(
              new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              })
            );
          }),
          catchError((error: HttpErrorResponse) => {
            return of(new AuthActions.LoginFail(this.handleError(error)));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.action$.pipe(ofType(AuthActions.LOGIN), tap(() => {
    console.log('hehe');
    this.router.navigate(["/recipes"]);
  }));

  constructor(private action$: Actions, private http: HttpClient, private router: Router) {}

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return errorMessage;
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct.";
        break;
    }
    return errorMessage;
  }
}
