import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2, signal,
} from '@angular/core';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  r2 = inject(Renderer2);
  elRef = inject(ElementRef).nativeElement;
  tooltipElem: HTMLElement | null = null;
  isActive = signal<boolean>(false);

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.isActive()) {
      this.r2.removeChild(this.elRef, this.tooltipElem);
      this.isActive.set(false)
      return;
    }
    const selectionText =  window.getSelection()?.toString();
    if (!selectionText) return
    this.tooltipElem = this.r2.createElement('div');
    this.r2.appendChild(this.elRef, this.tooltipElem);
    this.r2.setStyle(this.tooltipElem, 'position', 'fixed');
    this.r2.setStyle(this.tooltipElem, 'top', `${event.clientY + 30}px`);
    this.r2.setStyle(this.tooltipElem, 'left', `${event.clientX + 30}px`);
    this.r2.setStyle(this.tooltipElem, 'height', '100px');
    this.r2.setStyle(this.tooltipElem, 'width', '100px');
    this.r2.setStyle(this.tooltipElem, 'background', 'red');
    this.isActive.set(true)
  }
}
