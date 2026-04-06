import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appSpotlight]',
  host: {
    '(mousemove)': 'onMouseMove($event)',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class SpotlightDirective {
  private readonly _el = inject(ElementRef<HTMLElement>);

  onMouseMove(e: MouseEvent): void {
    const rect = this._el.nativeElement.getBoundingClientRect();
    this._el.nativeElement.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    this._el.nativeElement.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }

  onMouseLeave(): void {
    this._el.nativeElement.style.setProperty('--mouse-x', '-999px');
    this._el.nativeElement.style.setProperty('--mouse-y', '-999px');
  }
}
