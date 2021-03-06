import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, exhaustMap, map, take, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { of, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  private apiEndpoint =
    "https://ng-course-recipe-book-408b7-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json";

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.apiEndpoint, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.apiEndpoint)
      .pipe(
        catchError(() => {
          return throwError('Can not fetch Recipes');
        }),
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
