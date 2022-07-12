import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = '[RECIPE] Set recipes';
export const FETCH_RECIPES = '[RECIPE] Fetch Recipes';

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
}

export type RecipeActions  = SetRecipes | FetchRecipes ;