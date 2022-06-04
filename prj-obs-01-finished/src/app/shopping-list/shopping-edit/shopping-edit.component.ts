import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") form: NgForm;
  isEditMode: boolean = false;
  edittedItemIndex: number;
  startedEditItemSubsciption: Subscription;
  edittedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.startedEditItemSubsciption = this.slService.startedEditting.subscribe(
      (index: number) => {
        this.isEditMode = true;
        this.edittedItemIndex = index;
        this.edittedItem = this.slService.getIngedient(index);
        this.form.setValue(this.edittedItem);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditMode) {
      return this.updateItem();
    }

    this.addItem();
  }

  onDeleteItem() {
    this.slService.deleteIngredient(this.edittedItemIndex);
    this.resetForm();
  }

  onResetForm() {
    this.resetForm();
  }

  resetForm(): void {
    this.form.reset();
    this.isEditMode = false;
    this.edittedItem = null;
    this.edittedItemIndex = null;
  }

  private updateItem(): void {
    const newIngredient: Ingredient = this.form.value;
    console.log(newIngredient);
    this.slService.updateIngredient(this.edittedItemIndex, newIngredient);
    this.resetForm();
  }

  private addItem(): void {
    const formValue = this.form.value;
    const ingName = formValue.name;
    const ingAmount = formValue.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.startedEditItemSubsciption.unsubscribe();
  }
}
