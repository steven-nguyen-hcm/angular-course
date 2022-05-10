import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[appBasicHighlight]",
})
export class BasicHighlightDirective implements OnInit {
  @Input()
  appBasicHighlight: string;

  constructor(private elmRef: ElementRef) {}

  ngOnInit(): void {
    console.log(this.appBasicHighlight);

    this.elmRef.nativeElement.style.background = this.appBasicHighlight;
  }
}
