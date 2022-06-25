import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthInformation } from "./interfaces/auth-information.interface";
import { AuthResponseData } from "./interfaces/auth-response-data.interface";
import { User } from "./user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiKey = "AIzaSyDnviF4x-IlcbG58PvR0OURkCvse15I_ok";
  public user: User;
  public $userSubject = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(authInfo: AuthInformation) {
    return this.http
      .post<AuthResponseData>(this.getSignupUrl(), {
        ...authInfo,
        returnSecureToken: true,
      })
      .pipe(catchError(this.apiResponseErrorHandler));
  }

  signin(authInfo: AuthInformation) {
    return this.http
      .post<AuthResponseData>(this.getSigninUrl(), {
        ...authInfo,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.apiResponseErrorHandler),
        tap(this.handleSigninWithResponseData.bind(this))
      );
  }

  signout() {
    this.$userSubject.next(null);
    this.deleteUserAuthResponseData();
    this.router.navigate(["/auth"]);
  }

  autoLogin() {
    const userAuthDataFromLocalStorage = this.loadStoredUserAuthData();
    if (!userAuthDataFromLocalStorage) {
      return;
    }

    this.setupUserGlobally(userAuthDataFromLocalStorage);
  }

  private handleSigninWithResponseData(authData: AuthResponseData) {
    this.storeUserAuthResponseData(authData);
    this.setupUserGlobally(authData);
  }

  private setupUserGlobally(authData: AuthResponseData): void {
    const user: User = this.getUserData(authData);
    this.$userSubject.next(user);
  }

  private getUserData(userData: AuthResponseData): User {
    const tokenExpirationMicroTime =
      new Date().getTime() + +userData.expiresIn * 1000;
    const expirationDate = new Date(tokenExpirationMicroTime);
    return new User(
      userData.email,
      userData.localId,
      userData.idToken,
      expirationDate
    );
  }

  private storeUserAuthResponseData(authData: AuthResponseData) {
    localStorage.setItem("userAuthData", JSON.stringify(authData));
  }

  private deleteUserAuthResponseData() {
    localStorage.removeItem("userAuthData");
  }

  private loadStoredUserAuthData(): AuthResponseData | null {
    const userAuthDataFromLocalStorage = localStorage.getItem("userAuthData");
    return JSON.parse(userAuthDataFromLocalStorage) as AuthResponseData;
  }

  private apiResponseErrorHandler(errorResponse: HttpErrorResponse) {
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
