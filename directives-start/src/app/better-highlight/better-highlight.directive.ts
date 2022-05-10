import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elmRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.elmRef.nativeElement, 'background-color', '#00f');
  }
}
