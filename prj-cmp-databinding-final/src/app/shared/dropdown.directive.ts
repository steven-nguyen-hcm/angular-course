import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen: boolean = false;

  @HostListener("document:click", ["$event.target"]) toggleOpen(target) {
    console.log(this.elmRef.nativeElement);
    
    this.isOpen = this.elmRef.nativeElement.contains(target) ? !this.isOpen : false;
  }

  constructor(private elmRef: ElementRef) {}
}
