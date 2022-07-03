import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

const initialState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
};

export const shoppingListReducer = (
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      console.log("ShoppingListActions.ADD_INGREDIENT");
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_MULTIPLE_INGREDIENTS:
      action  = <ShoppingListActions.AddMultipleIngredients>action;
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload,
        ],
      };

    case "test-action":
      console.log("test-action");
    default:
      return state;
  }
};
