import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  activeUsers = ["Max", "Anna"];
  inactiveUsers = ["Chris", "Manu"];

  constructor(protected counterService: CounterService) {}

  toggleUserStatus(user: string) {
    if (this.activeUsers.includes(user)) {
      this.activeUsers = this.activeUsers.filter(
        (activeUser) => activeUser !== user
      );
      this.counterService.addInactivated();
      this.inactiveUsers.push(user);
      return;
    }

    this.inactiveUsers = this.inactiveUsers.filter(
      (inactiveUser) => inactiveUser !== user
    );
    this.activeUsers.push(user);
    this.counterService.addActivated();
  }
}
