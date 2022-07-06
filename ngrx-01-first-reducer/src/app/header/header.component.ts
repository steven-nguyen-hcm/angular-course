import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";

import * as fromApp from "../shared/store/app.reducer";
import { Store } from "@ngrx/store";
import * as fromAuth from "../auth/store/auth.reducer";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store
      .select("auth")
      .subscribe((user: fromAuth.State) => {
        this.isAuthenticated = !!user;
      });

    // this.userSub = this.authService.user.subscribe((user) => {
    //   this.isAuthenticated = !!user;
    //   console.log(!user);
    //   console.log(!!user);
    // });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
