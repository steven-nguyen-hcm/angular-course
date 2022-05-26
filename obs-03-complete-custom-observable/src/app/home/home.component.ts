import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription, Observable, Observer } from "rxjs";
import { filter, map } from "rxjs/operators";

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
    let customIntervalObservable = new Observable((observer) => {
      setInterval(() => {
        observer.next(count++);
        if (count === 29) {
          observer.complete();
        }
        if (count > 30) {
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

    this.interSubscription = customIntervalObservable.pipe(
      filter((data: number) => {
        return data % 2 == 0;
      }),
      map((data: number) => "Round: " + (data + 1))
    ).subscribe(
      ...observableCallbackHandlers
    );
  }

  ngOnDestroy(): void {
    this.interSubscription.unsubscribe();
  }
}
