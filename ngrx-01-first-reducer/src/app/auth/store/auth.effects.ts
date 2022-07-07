import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
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
          map((resData: any) => {
            const expirationDate = new Date(
              new Date().getTime() + resData.expiresIn * 1000
            );
            const { email, userId, token } = resData;
            return of(
              new AuthActions.Login({ email, userId, token, expirationDate })
            );
          }),
          catchError((error) => {
            return of();
          })
        );
    })
  );

  constructor(private action$: Actions, private http: HttpClient) {}
}
