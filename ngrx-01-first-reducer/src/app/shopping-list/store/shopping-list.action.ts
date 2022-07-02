import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT: string = "ADD_INGREDIENT";

export class AddIngredian implements Action {
  readonly type: string = ADD_INGREDIENT;
  payload: Ingredient;
}