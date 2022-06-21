import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { finalize } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { AuthResponseData } from "./interfaces/auth-response-data.interface";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.isLoginMode) {
      return;
    }

    this.isLoading = true;
    const { email, password } = form.value;
    this.authService
      .signup({ email, password })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (response: AuthResponseData) => {
          console.log(response);
          form.reset();
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = "Some error occured!";
        }
      );
  }
}
