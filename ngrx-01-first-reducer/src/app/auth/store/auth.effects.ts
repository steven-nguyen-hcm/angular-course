import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of, pipe } from "rxjs";
import {
  catchError,
  delay,
  map,
  switchMap,
  take,
  tap,
  timeout,
} from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../user.model";
import * as AuthActions from "./auth.action";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

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
          switchMap((resData: AuthResponseData) => {
            return this.handleSuccess(resData);
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              new AuthActions.AuthenticateFail(this.handleError(error))
            );
          })
        );
    })
  );

  @Effect()
  authSuccess = this.action$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(["/recipes"]);
    }),
    map((action: AuthActions.AuthenticateSuccess) => {
      const tokenExpirationDate = +action.payload.expirationDate;
      const expirationDuration =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      return new AuthActions.AutoLogout(expirationDuration);
    })
  );

  @Effect()
  autoLogout = this.action$.pipe(
    ofType(AuthActions.AUTO_LOGOUT),
    pipe(
      switchMap((action: AuthActions.AutoLogout) => {
        const expirationDuration = action.payload;
        if (!expirationDuration) {
          console.log("Cancel auto logout");
          return of(new AuthActions.Default());
        }
        console.log(
          "Auto logout after: ",
          Math.round(expirationDuration / 1000)
        );
        return of(new AuthActions.Logout()).pipe(delay(expirationDuration));
      })
    )
  );

  @Effect()
  authLogout = this.action$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem("userData");
      this.router.navigate(["/auth"]);
    }),
    map((action: AuthActions.Logout) => {
      return new AuthActions.AutoLogout(null);
    })
  );

  @Effect()
  authSignup = this.action$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((action: AuthActions.SignupStart) => {
      const { email, password } = action.payload;
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            environment.firebaseAPIKey,
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        )
        .pipe(
          switchMap((resData: AuthResponseData) => {
            return this.handleSuccess(resData);
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              new AuthActions.AuthenticateFail(this.handleError(error))
            );
          })
        );
    })
  );

  @Effect()
  autoLogin = this.action$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map((action: AuthActions.AutoLogin) => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem("userData"));

      if (!userData) {
        console.log("no user data");
        return new AuthActions.Default();
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
        });
      }
    }),
    take(1)
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  private handleSuccess(resData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const { email, localId: userId, idToken: token } = resData;
    console.log("success");
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem("userData", JSON.stringify(user));
    console.log({
      email,
      userId,
      token,
      expirationDate,
    });

    return of(
      new AuthActions.AuthenticateSuccess({
        email,
        userId,
        token,
        expirationDate,
      })
    );
  }

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
