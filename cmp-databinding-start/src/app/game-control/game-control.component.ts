import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent implements OnInit {
  intervalRef: any;
  @Output() newNumber: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  startGame(): void {
    this.intervalRef = setInterval(() => {
      let value = Math.round(Math.random() * 10);
      console.log(value);
    
      this.newNumber.emit(value);
    }, 1000);
  }

  stopGame(): void {
    !this.intervalRef || (clearInterval(this.intervalRef));
  }
}
