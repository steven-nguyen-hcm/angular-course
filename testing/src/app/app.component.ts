import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
})
export class AppComponent {
  title = 'testing';
  user: any;
  constructor(private userService: UserService) {
    this.user = userService.user;
  }
}
