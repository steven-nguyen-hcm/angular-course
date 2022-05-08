import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output()
  featureSelected: EventEmitter<string> = new EventEmitter();

  onSelected(feature: string) {
    this.featureSelected.emit(feature);
  }
}
