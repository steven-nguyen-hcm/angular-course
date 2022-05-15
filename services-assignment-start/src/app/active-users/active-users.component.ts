import { Component, Input } from "@angular/core";
import { UserService } from "../user.service";

@Component({
  selector: "app-active-users",
  templateUrl: "./active-users.component.html",
  styleUrls: ["./active-users.component.css"],
})
export class ActiveUsersComponent {
  @Input() users: string[];

  constructor(private userService: UserService) {}
  
  onSetToInactive(user: string) {
    this.userService.toggleUserStatus(user);
  }
}
