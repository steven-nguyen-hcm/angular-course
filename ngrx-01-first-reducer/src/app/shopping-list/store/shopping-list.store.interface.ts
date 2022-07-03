import { Ingredient } from "src/app/shared/ingredient.model"

export interface ShoppingListStore {
  shoppingList: {
    ingredients: Ingredient[]
  }
}