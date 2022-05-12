import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcr.createEmbeddedView(this.templateRef, {
        $implicit: '33333'
      });
    } else {
      this.vcr.clear();
    }
  }

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
}
