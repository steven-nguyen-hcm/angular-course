import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../account.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent {
  @Input() account: { name: string; status: string };
  @Input() id: number;

  onSetTo(status: string) {
    console.log(this.id, status);

    this.accountService.updateStatus(this.id, status);
  }

  constructor(protected accountService: AccountService) {}
}
