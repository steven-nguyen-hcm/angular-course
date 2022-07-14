import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { AppState } from "src/app/shared/store/app.reducer";
import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipes.action";
import * as fromRecipe from "./recipes.reducer";

@Injectable()
export class RecipeEffect {
  @Effect()
  fetchRecipes = this.action$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(
          "https://ng-course-recipe-book-408b7-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
        )
        .pipe(
          catchError((error) => {
            return of(null);
          })
        );
    }),RecipeActions
          ...recipe,
          ingredients: recipe.ingredients || [],
        };
      });
    }),
    map((recipes) => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.action$.pipe(
    ofType(RecipeActions.STORE_RECIPE),
    withLatestFrom(
      this.store.select("recipe").pipe(
        map((state: fromRecipe.State) => {
          return state.recipes;
        })
      )
    ),
    switchMap(([action, recipes]: [RecipeActions.StoreRecipe, Recipe[]]) => {
      console.log('store recipes');
      
      return this.http.put(
        "https://ng-course-recipe-book-408b7-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json",
        recipes
      );
    })
  );

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
