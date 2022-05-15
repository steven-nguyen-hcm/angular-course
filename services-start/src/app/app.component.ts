import { Component } from '@angular/core';
import { AccountService } from './account.service';
import { LoggingService } from './logging.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AccountService, LoggingService],
})
export class AppComponent {
  constructor(public accountService: AccountService){}
}
