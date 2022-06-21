import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthInformation } from "./interfaces/auth-information.interface";
import { AuthResponseData } from "./interfaces/auth-response-data.interface";

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiEndpoint =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnviF4x-IlcbG58PvR0OURkCvse15I_ok";

  constructor(private http: HttpClient) {}

  signup(authInfo: AuthInformation) {
    return this.http.post<AuthResponseData>(this.apiEndpoint, {
      ...authInfo,
      returnSecureToken: true
    });
  }
}
