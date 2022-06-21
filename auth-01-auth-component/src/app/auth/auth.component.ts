import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

enum AuthMode {
  "SIGNUP" = "signup",
  "LOGIN" = "login",
}

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  @ViewChild("authForm", { static: false }) authForm: NgForm;
  currentAuthMode: AuthMode = AuthMode.SIGNUP;

  ngOnInit() {}

  onSubmit() {
    console.log(this.authForm.value);
    
  }

  toggleAuthMode() {
    if (this.isSignupMode()) {
      return this.switchToLoginMode();
    }

    this.switchToSignupMode();
  }

  isSignupMode() {
    return this.currentAuthMode === AuthMode.SIGNUP;
  }

  getSubmitButtonText() {
    return this.isSignupMode() ? "Sign Up" : "Log In";
  }

  getSwitchModeButtonText() {
    return this.isSignupMode() ? "Switch to Login" : "Switch to Signup";
  }

  private switchToLoginMode() {
    this.currentAuthMode = AuthMode.LOGIN;
  }

  private switchToSignupMode() {
    this.currentAuthMode = AuthMode.SIGNUP;
  }
}
