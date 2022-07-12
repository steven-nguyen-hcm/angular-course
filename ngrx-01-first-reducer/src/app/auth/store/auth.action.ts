import { Action } from "@ngrx/store";

export const LOGOUT = "[AUTH] Logout";
export const LOGIN_START = "[AUTH] Login start";
export const SIGNUP_START = "[AUTH] Signup start";
export const AUTHENTICATE_SUCCESS = "[AUTH] Auth success";
export const AUTHENTICATE_FAIL = "[AUTH] Login fail";
export const CLEAR_ERROR = '[AUTH] Clear error';
export const AUTO_LOGIN = '[AUTH] Auto login';
export const AUTO_LOGOUT = '[AUTH] Auto logout'
export const DEFAULT = '[AUTH] Default';

export class AuthenticateSuccess implements Action {
  readonly type: string = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean
    }
  ) {}
}

export class Default implements Action {
  readonly type: string = DEFAULT;
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type: string = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type: string = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {};
}

export class ClearError implements Action {
  readonly type: string = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN;
}

export class AutoLogout implements Action {
  readonly type: string = AUTO_LOGOUT;
  constructor(public payload: number) {}
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | ClearError
  | AutoLogin
  | AutoLogout;
