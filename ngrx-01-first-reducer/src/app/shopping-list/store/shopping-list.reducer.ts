import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

export interface ShoppingListState {
  ingredients: Ingredient[];
  edittedIngredient: Ingredient;
  edittedIngredientIndex: number;
}

export interface AppState {
  shoppingList: ShoppingListState
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  edittedIngredient: null,
  edittedIngredientIndex: -1
};

export const shoppingListReducer = (
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
): ShoppingListState => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      console.log("ShoppingListActions.ADD_INGREDIENT");
      action = <ShoppingListActions.AddIngredian>action;
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_MULTIPLE_INGREDIENTS:
      action = <ShoppingListActions.AddMultipleIngredients>action;
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      action = <ShoppingListActions.UpdateIngredient>action;
      const beforeUpdateIngredient = state.ingredients[action.payload.index];
      const afterUpdatedIngredient = {
        ...beforeUpdateIngredient,
        ...action.payload.ingredient,
      };

      const allCloneIngredients = [...state.ingredients];
      allCloneIngredients[action.payload.index] = afterUpdatedIngredient;

      return {
        ...state,
        ingredients: allCloneIngredients,
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      action = <ShoppingListActions.DeleteIngredient>action;
      console.log(action.payload, ...state.ingredients);

      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== action.payload;
        }),
      };

    default:
      return state;
  }
};
