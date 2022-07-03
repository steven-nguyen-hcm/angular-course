import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";


export const ADD_INGREDIENT: string = "ADD_INGREDIENT";
export const ADD_MULTIPLE_INGREDIENTS: string = "ADD_MULTIPLE_INGREDIENT";

export class AddIngredian implements Action {
  readonly type: string = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}


export class AddMultipleIngredients implements Action {
  readonly type: string = ADD_MULTIPLE_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export type ShoppingListActions = AddIngredian | AddMultipleIngredients;
