import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

export interface ShoppingListState {
  ingredients: Ingredient[];
  edittedIngredient: Ingredient;
  edittedIngredientIndex: number;
}

export interface AppState {
  shoppingList: ShoppingListState;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  edittedIngredient: null,
  edittedIngredientIndex: -1,
};

export const shoppingListReducer = <T extends { payload: any }>(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions & T
): ShoppingListState => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      if (!(action instanceof ShoppingListActions.AddIngredian)) {
        return state;
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_MULTIPLE_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const beforeUpdateIngredient =
        state.ingredients[state.edittedIngredientIndex];
      const afterUpdatedIngredient = {
        ...beforeUpdateIngredient,
        ...action.payload,
      };

      const allCloneIngredients = [...state.ingredients];
      allCloneIngredients[state.edittedIngredientIndex] =
        afterUpdatedIngredient;

      return {
        ...state,
        ingredients: allCloneIngredients,
        edittedIngredient: null,
        edittedIngredientIndex: -1
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => {
          return index !== state.edittedIngredientIndex;
        })
      };

    case ShoppingListActions.START_EDIT_INGREDIENT:
      const actionPayload = (<ShoppingListActions.StartEditIngredient>action)
        .payload;
      return {
        ...state,
        edittedIngredientIndex: action.payload,
        edittedIngredient: { ...state.ingredients[action.payload] },
      };

    case ShoppingListActions.STOP_EDIT_INGREDIENT:
      return {
        ...state,
        edittedIngredient: null,
        edittedIngredientIndex: -1,
      };

    default:
      return state;
  }
};
