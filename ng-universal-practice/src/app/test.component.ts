import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: 'test <span *ngIf="display">asdsad</span>'
})
export class TestComponent {
  display= false;
  title = 'ng-universal-practice';
}
