import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  nativeElm: HTMLElement;
  @HostBinding("style.backgroundColor")
  backgroundColor: string;

  constructor(private elmRef: ElementRef, private renderer: Renderer2) {
    this.nativeElm = elmRef.nativeElement;
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.nativeElm, "background-color", "#00f");
  }

  @HostListener("mouseenter")
  mouseenter = (event: MouseEvent) => {
    this.renderer.setStyle(this.nativeElm, "color", "yellow");
    this.backgroundColor = 'purple';
  };

  @HostListener("mouseleave")
  mouseleave = () => {
    this.renderer.setStyle(this.nativeElm, "color", "#000");
    this.backgroundColor = 'inherit';
  };
}
