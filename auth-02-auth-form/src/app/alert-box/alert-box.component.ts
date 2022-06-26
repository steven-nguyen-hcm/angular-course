import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-alert-box",
  templateUrl: "./alert-box.component.html",
  styleUrls: ["./alert-box.component.css"],
})
export class AlertBoxComponent {
  @Output() onCloseEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.onCloseEventEmitter.emit();
  }
}
