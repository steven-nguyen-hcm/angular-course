import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  form: FormGroup;
  checklist: string[] = ["Football", "Game", "Biking"];
  checkedItems: string[] = ["Game"];
  checklistFormArray: FormArray = new FormArray([]);

  constructor(private route: ActivatedRoute) {}

  get ingredientControls(): FormGroup[] {
    return <FormGroup[]>(<FormArray>this.form.get("ingredients")).controls;
  }

  get checklistControls(): FormControl[] {
    return <FormControl[]>(<FormArray>this.form.get("checklist")).controls;
  }

  ngOnInit() {
    this.getIdFromRouteParams();
    this.initForm();
  }

  private getIdFromRouteParams() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
    });
  }

  private initForm(): void {
    this.initCheckedItems();
    this.form = new FormGroup({
      name: new FormControl("", Validators.required),
      ingredients: new FormArray([]),
      checklist: this.checklistFormArray,
    });
  }

  onCheckboxChange(event: Event, index: number) {
    if (this.isCheckboxChecked(event)) {
      this.addCheckedItem(event);
      return;
    }

    this.removeUncheckedItem(index);
  }

  private isCheckboxChecked(event: Event): boolean {
    return (<HTMLInputElement>event.target).checked;
  }

  private addCheckedItem(event: Event) {
    const value = (<HTMLInputElement>event.target).value;
    this.checklistFormArray.push(new FormControl(value));
  }

  private removeUncheckedItem(index: number) {
    this.checklistFormArray.removeAt(index);
  }

  isChecked(item: string) {
    return this.checkedItems.includes(item);
  }

  onAddIngredient() {
    const ingredient: FormGroup = new FormGroup({
      ingredientName: new FormControl(null, Validators.required),
      quantity: new FormControl(null, [
        Validators.required,
        this.numberValidator.bind(this),
      ]),
    });
    (this.form.get("ingredients") as FormArray).controls.push(ingredient);
  }

  onSubmit() {
    console.log(this.form.value);
    console.log(this.form.get("ingredients"));
  }

  numberValidator(control: FormControl): { [s: string]: boolean } {
    const value = control.value;
    if (isNaN(value)) {
      return {
        notANumber: true,
      };
    }
    return null;
  }

  private initCheckedItems(): void {
    if (this.checkedItems.length) {
      for (const item of this.checkedItems) {
        this.checklistFormArray.push(new FormControl(item));
      }
    }
  }
}
