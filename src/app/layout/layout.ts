import { Component } from '@angular/core';
import { TextEntries } from '../text/text-entries/text-entries';
import { EditText } from '../text/edit-text/edit-text';

@Component({
  selector: 'app-layout',
  imports: [TextEntries, EditText],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
