import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[contentArea]',
  standalone: true
})
export class DynamicContentAreaDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
