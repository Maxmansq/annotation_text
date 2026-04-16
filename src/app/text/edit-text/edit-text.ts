import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextService } from '../service/textService';
import { CreateTextDto } from '../interfaces/text-interfaces';
import { SvgIcon } from '../../common-UI/component/svg-icon/svg-icon';
import { TooltipDirective } from '../../common-UI/directives/tooltip.directive';

@Component({
  selector: 'app-edit-text',
  imports: [ReactiveFormsModule, SvgIcon, TooltipDirective],
  templateUrl: './edit-text.html',
  styleUrl: './edit-text.scss',
})
export class EditText implements OnInit {
  editForm = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl('', { nonNullable: true }),
    content: new FormControl('', { nonNullable: true }),
  });
  #textServices = inject(TextService);

  idEditFile = signal<number | null>(null);

  ngOnInit() {
    this.#textServices.edit.subscribe((editText) => {
      this.idEditFile.set(editText.id);
      this.editForm.setValue({
        id: editText.id,
        title: editText.title,
        content: editText.content,
      });
    });
  }

  onExitEditText() {
    this.idEditFile.set(null);
    this.idEditFile.set(null);
    this.editForm.reset();
  }

  onSaveText() {
    const createText: CreateTextDto = {
      id: this.idEditFile(),
      title: this.editForm.controls.title.value,
      content: this.editForm.controls.content.value,
    };
    this.#textServices.addText(createText);
    this.editForm.reset();
    this.idEditFile.set(null);
  }
}
