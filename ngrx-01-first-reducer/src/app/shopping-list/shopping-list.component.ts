import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Store } from "@ngrx/store";
import { LoggingService } from "../logging.service";
import { Ingredient } from "../shared/ingredient.model";
import * as ShoppingListActions from './store/shopping-list.action';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit!");
  }

  onEditItem(index: number) {
    console.log(index);

    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEditIngredient(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
