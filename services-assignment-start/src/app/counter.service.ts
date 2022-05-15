import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CounterService {
  activatedCount: number = 0;
  inactivatedCount: number = 0;

  addActivated() {
    this.activatedCount++;
    console.log("Active times:", this.activatedCount);
    
  }

  addInactivated() {
    this.inactivatedCount++;
    console.log("Inactive times", this.inactivatedCount);
  }
}
