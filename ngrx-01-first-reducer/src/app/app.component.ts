import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AutoLogin } from './auth/store/auth.action';
import { LoggingService } from './logging.service';
import * as fromApp from './shared/store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
