import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styles: ['']
})
export class SvgIcon {
  @Input() icon = '';

  get href(): string {
    return `/image/${this.icon}.svg#${this.icon}`;
  }
}
