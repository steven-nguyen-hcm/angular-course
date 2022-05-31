import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("form") form: NgForm;

  subscriptionTypes: string[] = ["Basic", "Advanced", "Pro"];
  protected defaultSubscriptionType: string = "Advanced";

  userData: {
    email: string;
    subscriptionType: string;
  };

  constructor() {}

  onSubmit() {
    this.userData = { ...this.form.value };
    this.form.reset();
  }
}