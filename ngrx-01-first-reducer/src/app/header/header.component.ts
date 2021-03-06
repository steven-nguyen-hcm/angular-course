import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as AuthActions from '../auth/store/auth.action';
import * as fromAuth from "../auth/store/auth.reducer";
import { User } from "../auth/user.model";
import * as RecipeActions from '../recipes/store/recipes.action';
import * as fromApp from "../shared/store/app.reducer";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select("auth")
      .pipe(map((authState: fromAuth.State) => authState.user))
      .subscribe((user: User) => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipe());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
