import { User } from "../user.model";
import * as AuthActions from "./auth.action";

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
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
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
