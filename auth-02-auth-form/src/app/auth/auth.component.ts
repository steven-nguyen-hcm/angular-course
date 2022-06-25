import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { AuthResponseData } from "./interfaces/auth-response-data.interface";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.$userSubject.subscribe(user => {
      if (!!user) {
        this.router.navigate(['/recipes']);
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.errorMessage = null;

    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    const { email, password } = form.value;
    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.signin({ email, password });
    } else {
      authObservable = this.authService.signup({ email, password });
    }

    authObservable
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (response: AuthResponseData) => {
          form.reset();
        },
        (errorMessage: string) => {
          this.errorMessage = errorMessage;
        }
      );
  }
}
