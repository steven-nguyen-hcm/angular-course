import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  constructor(
    private dataStoreService: DataStorageService
  ) {}

  onSaveRecipes() {
    this.dataStoreService.storeRecipes();
  }

  onFetchRecipes() {
    // this.dataStoreService.fetchRecipes().subscribe();
  }
}
