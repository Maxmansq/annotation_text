import {
  Component,
  ElementRef,
  inject,
  input, output,
  Renderer2,
  signal,
  SimpleChanges,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { isActive } from '@angular/router';

@Component({
  selector: 'app-tooltip-text',
  imports: [NgClass],
  templateUrl: './tooltip-text.html',
  styleUrl: './tooltip-text.scss',
})
export class TooltipText {
  elRef = inject(ElementRef);
  #r2 = inject(Renderer2);
  isActiveColor = signal<boolean>(false);
  colorData = [
    '#FF0000', // red
    '#00FF00', // lime
    '#0000FF', // blue
    '#FFFF00', // yellow
    '#FF00FF', // magenta
    '#00FFFF', // cyan
    '#FFA500', // orange
    '#800080', // purple
    '#008000', // green
    '#000000', // black
    '#f0c78b',
    '#a8baa4',
  ];
  colorFill = output<string>()

  coordinates = input<number[]>([0, 0]);
  ngOnChanges(changes: SimpleChanges<TooltipText>) {
    const elNative = this.elRef.nativeElement;
    const [x, y] = this.coordinates();
    this.#r2.setStyle(elNative, 'top', `${20 + y}px`);
    this.#r2.setStyle(elNative, 'left', `${20 + x}px`);
  }

  onColor(color: string) {
    this.colorFill.emit(color);
  };

  onColorFind() {
    if (this.isActiveColor()) {
      this.isActiveColor.set(false);
      return;
    }
    this.isActiveColor.set(true);
  }
}
