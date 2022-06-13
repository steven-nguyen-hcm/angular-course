import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()
export class DataStorageService {
  private recipes: Recipe[];

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    console.log(recipes);

    return this.http
      .put(this.getRequestApi("recipes.json"), recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> | Recipe[] {
    if (this.recipes) {
      return this.recipes;
    }

    return this.http.get(this.getRequestApi("recipes.json")).pipe(
      tap((recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipeService.setRecipes(recipes);
      })
    );
  }

  private getRequestApi(path: string): string {
    console.log(env.apiEndpoint + path);

    return env.apiEndpoint + path;
  }
}
