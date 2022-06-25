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
  private tokenExpirationDurationTimeout: any;

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
        tap(this.handleSigninWithApiResponseData.bind(this))
      );
  }

  signout() {
    this.$userSubject.next(null);
    this.deleteUserFromLocalStorage();
    this.router.navigate(["/auth"]);
    clearTimeout(this.tokenExpirationDurationTimeout);
  }

  autoLogin() {
    this.handleSigninWithLocalStorageData();
  }

  private setAutoSignout(user: User) {
    const tokenRemainingTime =
      user.tokenExpirationDate.getTime() - new Date().getTime();
      
    console.log("Auto logout in: " + Math.round(tokenRemainingTime / 1000) + " seconds.");

    this.tokenExpirationDurationTimeout = setTimeout(() => {
      this.signout();
    }, tokenRemainingTime);
  }

  private handleSigninWithApiResponseData(authData: AuthResponseData) {
    const user: User = this.getUserModel(authData);
    this.$userSubject.next(user);
    this.storeUserToLocalStorage(user);
    this.setAutoSignout(user);
  }

  private handleSigninWithLocalStorageData() {
    const user = this.loadUserFromLocalStorage();
    if (!user) {
      return;
    }
    this.$userSubject.next(user);
    this.setAutoSignout(user);
  }

  private getUserModel(userData: AuthResponseData): User {
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

  private storeUserToLocalStorage(user: User) {
    localStorage.setItem("userAuthData", JSON.stringify(user));
  }

  private deleteUserFromLocalStorage() {
    localStorage.removeItem("userAuthData");
  }

  private loadUserFromLocalStorage(): User | null {
    const userAuthDataFromLocalStorage = localStorage.getItem("userAuthData");

    if (!userAuthDataFromLocalStorage) {
      return;
    }
    const { email, id, _token, _tokenExpirationDate } = JSON.parse(
      userAuthDataFromLocalStorage
    );

    return new User(email, id, _token, new Date(_tokenExpirationDate));
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
