import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthInformation } from "./interfaces/auth-information.interface";
import { AuthResponseData } from "./interfaces/auth-response-data.interface";
import { User } from "./user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiKey = "AIzaSyDnviF4x-IlcbG58PvR0OURkCvse15I_ok";
  public user: User;
  public $userSubject = new Subject<User>();

  constructor(private http: HttpClient) {}

  isAuthenticated() {
    return !!this.user;
  }

  signup(authInfo: AuthInformation) {
    return this.http
      .post<AuthResponseData>(this.getSignupUrl(), {
        ...authInfo,
        returnSecureToken: true,
      })
      .pipe(catchError(this.errorHandler));
  }

  signin(authInfo: AuthInformation) {
    return this.http
      .post<AuthResponseData>(this.getSigninUrl(), {
        ...authInfo,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.errorHandler),
        tap(this.handleSigninSuccessResponse.bind(this))
      );
  }

  signout() {
    this.user = null;
    this.$userSubject.next(this.user);
  }

  private handleSigninSuccessResponse(response: AuthResponseData) {
    const tokenExpirationMicroTime = new Date().getTime() + +response.expiresIn * 1000;
    const expirationDate = new Date(tokenExpirationMicroTime);
    this.user = new User(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );

    this.$userSubject.next(this.user);
    console.log(this.user);
    
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    let errorMessage: string = "Unknow error occured!";

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorResponse.error.error.message);
    }

    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email is already exists.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Invalid login information";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email not found!";
        break;
    }

    return throwError(errorMessage);
  }
  private getSignupUrl() {
    return (
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      this.apiKey
    );
  }
  private getSigninUrl() {
    return (
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      this.apiKey
    );
  }
}
