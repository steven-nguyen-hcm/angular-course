import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { exhaustMap, map, switchMap, take } from "rxjs/operators";
import * as RecipeActions from "../recipes/store/recipes.action";
import * as fromRecipe from "../recipes/store/recipes.reducer";
import { AppState } from "../shared/store/app.reducer";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<AppState>, private action$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("recipe").pipe(
      take(1),
      map((state: fromRecipe.State) => {
        return state.recipes;
      }),
      switchMap((recipes: Recipe[]) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          return this.action$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
        }
        return of(recipes);
      }),
    );
  }
}
