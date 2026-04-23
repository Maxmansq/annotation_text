import {
  Component,
  ComponentRef,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Renderer2,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipText } from '../../tooltip-text/tooltip-text';
import { ControlText } from '../../../text/interfaces/text-interfaces';

@Component({
  selector: 'app-input-edit-text-control',
  imports: [],
  templateUrl: './input-edit-text-control.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputEditTextControl),
      multi: true,
    },
  ],
  styleUrl: './input-edit-text-control.scss',
})
export class InputEditTextControl implements ControlValueAccessor {
  #r2 = inject(Renderer2);
  flagTooltip = signal<boolean>(false);
  containerRef: ComponentRef<TooltipText> | null = null;
  tooltip = viewChild('tooltip', { read: ViewContainerRef });
  inputContent = viewChild('contentEdit', { read: ElementRef });

  @HostListener('mouseup', ['$event'])
  onToolsUp(event: MouseEvent) {
    const selection = window.getSelection();

    if (this.flagTooltip() || !selection?.toString()) {
      this.destroyToolTip();
      return;
    }

    this.containerRef = this.tooltip()?.createComponent(TooltipText) ?? null;
    this.containerRef?.instance.colorFill.subscribe((color) => {
      // получаем выделенное
      const range = selection?.getRangeAt(0);
      const selText = selection?.toString();

      // создаем span
      const colorSpan = this.#r2.createElement('span');
      this.#r2.setStyle(colorSpan, 'background', color);
      this.#r2.appendChild(colorSpan, this.#r2.createText(selText));

      // удаляем выделение
      range?.deleteContents();

      // вставляем всё по порядку
      const spaceBefore = document.createTextNode('$');
      const spaceAfter = document.createTextNode('$');
      range?.insertNode(spaceAfter);
      range?.insertNode(colorSpan);
      range?.insertNode(spaceBefore);

      // ставим курсор после всего блока
      const newRange = document.createRange();
      const sel = window.getSelection();

      newRange.setStartAfter(spaceAfter);
      newRange.collapse(true);

      sel?.removeAllRanges();
      sel?.addRange(newRange);

      const inputEl = this.inputContent()?.nativeElement;

      if (inputEl) {
        const inputText: ControlText = {
          text: inputEl.innerText,
          template: inputEl.innerHTML,
        };

        this.onChange(inputText);
        this.onTouched();
      }
    });
    if (!this.containerRef) return;

    this.containerRef.setInput('coordinates', [event.clientX, event.clientY]);
    this.flagTooltip.set(true);
  }

  destroyToolTip() {
    this.containerRef?.destroy();
    this.flagTooltip.set(false);
  }

  onChange = (text: ControlText) => {
    return;
  };

  onTouched = () => {
    return;
  };

  writeValue(text: ControlText): void {
    const inputElement = this.inputContent();
    if (!inputElement) return;
    console.log(text)
    inputElement.nativeElement.innerHTML = text.template
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: any) {
    const inputText: ControlText = {
      text: event.target.innerText,
      template: event.target.innerHTML,
    };
    this.onChange(inputText);
  }
}
