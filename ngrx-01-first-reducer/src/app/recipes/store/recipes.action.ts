import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = '[RECIPE] Set recipes';

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export type RecipeActions  = SetRecipes;