import { User } from "../user.model";
import * as AuthActions from "./auth.action";

export interface State {
  user: User;
  authError: string;
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export const authReducer = (
  state: State = initialState,
  action: AuthActions.AuthActions
): State => {
  switch (action.type) {
    case AuthActions.LOGIN:
      const { email, userId, token, expirationDate } = (<AuthActions.Login>(
        action
      )).payload;
      return {
        ...state,
        user: new User(email, userId, token, expirationDate),
        loading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        authError: (<AuthActions.LoginFail>action).payload,
        user: null,
        loading: false
      };
    default:
      return state;
  }
};
