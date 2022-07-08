import { Action } from "@ngrx/store";

export const LOGIN = "[AUTH] Login";
export const LOGOUT = "[AUTH] Logout";
export const LOGIN_START = "[AUTH] Login start";
export const LOGIN_FAIL = "[AUTH] Login fail";

export class Login implements Action {
  readonly type: string = LOGIN;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginFail implements Action {
  readonly type: string = LOGIN_FAIL;
  constructor(public payload: string) {}
}

export type AuthActions = Login | Logout | LoginStart | LoginFail;
