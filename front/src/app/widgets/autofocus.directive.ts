import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private elt: ElementRef<HTMLInputElement>) {}
  ngAfterViewInit(): void {
    this.elt.nativeElement.select();
  }
}
