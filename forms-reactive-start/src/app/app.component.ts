import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { CustomValidatorInterface } from "./custom-validator.interface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenNames = ["steven", "admin"];
  private formStatusChangeSubscription: Subscription;

  constructor(private fb: FormBuilder) {}

  get hobbyControls(): object {
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }

  ngOnInit() {
    this.initFormGroup();
    this.registerFormStatusSubscription();
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const newFormControl = new FormControl(null, Validators.required);
    (this.signupForm.get("hobbies") as FormArray).push(newFormControl);
  }

  private initFormGroup() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNamesValidator,
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmailValidator
        ),
      }),
      gender: new FormControl("male", Validators.required),
      hobbies: new FormArray([]),
    });
  }

  private registerFormStatusSubscription() {
    this.formStatusChangeSubscription = this.signupForm.statusChanges.subscribe(
      (status: string) => console.log(status)
    );
  }

  private forbiddenNamesValidator = (
    control: FormControl
  ): CustomValidatorInterface => {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { forbiddenName: true };
    }
    return null;
  };

  private forbiddenEmailValidator(
    control: FormControl
  ): Promise<CustomValidatorInterface> | Observable<CustomValidatorInterface> {
    const promise = new Promise<CustomValidatorInterface>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "admin@test.com") {
          resolve({ forbiddenEmail: true });
        } else {
          resolve(null);
        }
      }, 2500);
    });

    return promise;
  }

  ngOnDestroy(): void {
    this.formStatusChangeSubscription.unsubscribe();
  }
}
