import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-alert-box",
  templateUrl: "./alert-box.component.html",
  styleUrls: ["./alert-box.component.css"],
})
export class AlertBoxComponent {
  public message: string;
  public onClose() {
    console.info('This method is expected to be re-declared by the Component Referece instance');
  }
}
