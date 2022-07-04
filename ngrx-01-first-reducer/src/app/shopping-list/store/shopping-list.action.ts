import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT: string = "ADD_INGREDIENT";
export const ADD_MULTIPLE_INGREDIENTS: string = "ADD_MULTIPLE_INGREDIENT";
export const DELETE_INGREDIENT: string = "DELETE_INGREDIENT";
export const UPDATE_INGREDIENT: string = "UPDATE_INGREDIENT";

export class AddIngredian implements Action {
  readonly type: string = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddMultipleIngredients implements Action {
  readonly type: string = ADD_MULTIPLE_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class DeleteIngredient implements Action {
  readonly type: string = DELETE_INGREDIENT;
  constructor(public payload: number) {}
}

export class UpdateIngredient implements Action {
  readonly type: string = UPDATE_INGREDIENT;
  constructor(public payload: { index: number; ingredient: Ingredient }) {}
}

export type ShoppingListActions =
  | AddIngredian
  | AddMultipleIngredients
  | DeleteIngredient
  | UpdateIngredient;
