import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipes.action";

@Injectable()
export class RecipeEffect {
  @Effect()
  fetchRecipes = this.action$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        "https://ng-course-recipe-book-408b7-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
      ).pipe(
        catchError((error) => {
          return of(null);
        })
      )
    }),
    map((recipes) => {
      return (recipes || []).map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients || [],
        }
      })
    }),
    map((recipes) => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  constructor(private action$: Actions, private http: HttpClient) {}
}
