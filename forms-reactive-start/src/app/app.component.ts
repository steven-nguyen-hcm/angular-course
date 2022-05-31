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
    this.signupForm = this.fb.group({
      userData: this.fb.group({
        username: this.fb.control(null, Validators.required),
        email: this.fb.control(null, [Validators.required, Validators.email]),
      }),
      gender: this.fb.control("male", Validators.required),
      hobbies: this.fb.array([]),
    });

    // this.signupForm = new FormGroup({
    //   userData: new FormGroup({
    //     username: new FormControl(null, Validators.required),
    //     email: new FormControl(null, [Validators.required, Validators.email]),
    //   }),
    //   gender: new FormControl("male", Validators.required),
    //   hobbies: new FormArray([]),
    // });
  }
}
