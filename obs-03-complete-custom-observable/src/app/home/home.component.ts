import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription, Observable, Observer } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  interSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    let count = 0;
    const customIntervalObservable = new Observable((observer) => {
      setInterval(() => {
        observer.next(count++);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error("Count is greater than 3!");
        }
      }, 1000);
    });

    const observableCallbackHandlers = [
      (count) => {
        console.log(count);
      },
      (error) => {
        alert(error);
      },
      () => {
        console.log("done");
      },
    ];

    this.interSubscription = customIntervalObservable.subscribe(
      ...observableCallbackHandlers
    );
  }

  ngOnDestroy(): void {
    this.interSubscription.unsubscribe();
  }
}
