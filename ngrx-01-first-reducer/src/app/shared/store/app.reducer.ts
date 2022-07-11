import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromRecipe from '../../recipes/store/recipes.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
  recipe: fromRecipe.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipe: fromRecipe.recipesReducer
}

export interface AuthState extends fromAuth.State {};