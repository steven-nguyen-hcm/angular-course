import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthInformation } from "./interfaces/auth-information.interface";
import { AuthResponseData } from "./interfaces/auth-response-data.interface";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiKey = "AIzaSyDnviF4x-IlcbG58PvR0OURkCvse15I_ok";

  constructor(private http: HttpClient) {}

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
      .pipe(catchError(this.errorHandler));
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
