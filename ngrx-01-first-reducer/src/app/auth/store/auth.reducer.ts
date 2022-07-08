import { stagger } from "@angular/animations";
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
  console.log(action.type);
  
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const { email, userId, token, expirationDate } = (<AuthActions.AuthenticateSuccess>(
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
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        loading: true,
        authError: null
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        authError: (<AuthActions.AuthenticateFail>action).payload,
        user: null,
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      return state;
  }
};
