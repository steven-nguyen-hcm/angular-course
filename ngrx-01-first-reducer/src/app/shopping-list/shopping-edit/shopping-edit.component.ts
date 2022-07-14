import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "src/app/shared/store/app.reducer";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "../store/shopping-list.action";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false }) slForm: NgForm;
  subscription: Subscription;
  isEditting = false;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select("shoppingList")
      .subscribe((state: AppState['shoppingList']) => {
        if (!!state.edittedIngredient) {
          this.isEditting = true;
          this.editedItem = state.edittedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.isEditting) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredian(newIngredient));
    }
    this.isEditting = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.isEditting = false;
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
    this.subscription.unsubscribe();
  }
}
