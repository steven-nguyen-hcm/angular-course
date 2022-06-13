import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private recipeService: RecipeService, private dataStoreService: DataStorageService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    console.log('Recipe resolver');
    console.log(this.recipeService.getRecipes());
     
    return this.dataStoreService.fetchRecipes();
  }
}