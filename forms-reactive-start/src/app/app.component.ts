import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenNames = ["steven", "admin"];

  constructor(private fb: FormBuilder) {}

  get hobbyControls(): object {
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }

  ngOnInit() {
    this.initFormGroup();
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
          (control: FormControl): { [key: string]: boolean } => {
            if (this.forbiddenNames.indexOf(control.value) !== -1) {
              return { nameIsForbidden: true };
            }
            return null;
          },
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl("male", Validators.required),
      hobbies: new FormArray([]),
    });
  }

  forbiddenNamesValidator(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
}
