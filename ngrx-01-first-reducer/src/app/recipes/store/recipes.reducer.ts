import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipes.action";

export interface State {
  recipes: Recipe[];
}

const initialState = {
  recipes: [],
};

export function recipesReducer(
  state = initialState,
  action: RecipeActions.RecipeActions & { payload: any }
): State {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case RecipeActions.FETCH_RECIPES:
      return {
        ...state
      }
    default:
      return state;
  }
}
