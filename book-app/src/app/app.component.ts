import { Component } from '@angular/core';

enum Feature {
  SHOPPING = 'shopping',
  RECIPE = 'recipe'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFeature: Feature = Feature.RECIPE; 
  feature: {} = Feature;

  onNavigate(feature: Feature) {
    console.log(feature);  
    this. selectedFeature= feature;
  }
}
