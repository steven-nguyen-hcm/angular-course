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
    case RecipeActions.SET_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
      };
    }
    case RecipeActions.DELETE_RECIPE: {
      return {
        ...state,
        recipes: state.recipes.filter((recipe: Recipe, index) => {
          return index !== (<RecipeActions.DeleteRecipe>action).payload;
        }),
      };
    }
    case RecipeActions.UPDATE_RECIPE: {
      const payload = (<RecipeActions.UpdateRecipe>action).payload;
      const recipeChanges = payload.recipe;
      const currentRecipe = { ...state[payload.id] };

      const recipesSnapshot = [...state.recipes];
      recipesSnapshot[payload.id] = {
        ...currentRecipe,
        ...recipeChanges,
      };

      return {
        ...state,
        recipes: recipesSnapshot,
      };
    }
    case RecipeActions.ADD_RECIPE: {
      const newRecipe = (<RecipeActions.AddRecipe>action).payload;
      const recipesSnapshot = [...state.recipes];
      recipesSnapshot.push(newRecipe);
      return {
        ...state,
        recipes: recipesSnapshot,
      };
    }
    default: {
      return state;
    }
  }
}
