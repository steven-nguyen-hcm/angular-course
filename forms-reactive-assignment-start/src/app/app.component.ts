import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

interface CustomValidatorInterface {
  [s: string]: boolean;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  projectStatuses: string[] = ["Stable", "Critical", "Finished"];
  form: FormGroup;

  ngOnInit() {
    this.initFormGroup();
  }

  onSubmit() {
    console.log(this.form.value);
  }

  private initFormGroup(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.forbiddenEmailValidator
      ),
      status: new FormControl("Stable", Validators.required),
    });
  }

  private forbiddenEmailValidator = (
    control: FormControl
  ): Promise<CustomValidatorInterface> => {
    const promise = new Promise<CustomValidatorInterface>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ forbiddenEmail: true });
        }
        resolve(null);
      }, 1000);
    });

    return promise;
  };
}
