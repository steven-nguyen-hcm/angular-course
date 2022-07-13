import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const SET_RECIPES = "[RECIPE] Set recipes";
export const FETCH_RECIPES = "[RECIPE] Fetch Recipes";
export const DELETE_RECIPE = "[RECIPE] Delete Recippe";
export const ADD_RECIPE = "[RECIPE] Add Recipe";
export const UPDATE_RECIPE = "[RECIPE] Update Recipe";
export const STORE_RECIPE = "[RECIPE] Sore Recipe";

export class SetRecipes implements Action {
  readonly type: string = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type: string = FETCH_RECIPES;
}

export class DeleteRecipe implements Action {
  readonly type: string = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class AddRecipe implements Action {
  readonly type: string = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type: string = UPDATE_RECIPE;
  constructor(public payload: { id: number; recipe: Recipe }) {}
}

export class StoreRecipe implements Action {
  readonly type: string = STORE_RECIPE;
}

export type RecipeActions =
  | AddRecipe
  | SetRecipes
  | FetchRecipes
  | DeleteRecipe
  | UpdateRecipe
  | StoreRecipe;
