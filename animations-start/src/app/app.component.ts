import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("list1AnimationState", [
      state(
        "in",
        style({
          opacity: 1,
          backgroundColor: "transparent",
        })
      ),
      transition("void => *", [
        style({
          opacity: 0,
          backgroundColor: "#ccc",
        }),
        animate(200),
      ]),
      transition(
        "* => void",
        animate(
          300,
          style({
            opacity: 0,
            backgroundColor: "#ccc",
          })
        )
      ),
    ]),
    trigger("list2Animation", [
      state(
        "in",
        style({
          transform: "translateX(0)",
          backgroundColor: "transparent",
        })
      ),
      transition("void => *", [
        style({
          transform: "translateX(100px)",
        }),
        animate(200),
      ]),
      transition("* => void", [
        group([
          animate(
            200,
            style({
              color: "red",
            })
          ),
          animate(
            500,
            style({
              transform: "translateX(100px)",
              opacity: 0,
              backgroundColor: "#ccc",
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  list = ["Milk", "Sugar", "Bread"];
  state: string = "normal";

  onAnimate() {
    this.state = this.state === "normal" ? "highlighted" : "normal";
  }

  onAdd(item) {
    if (!item) return;
    this.list.push(item);
  }

  onDelete(item) {
    console.log(item);

    this.list = this.list.filter((it) => {
      return item !== it;
    });
  }
}
