import {
  Component, ElementRef,
  inject,
  OnInit,
  signal, viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextService } from '../../data-access/text-formater/service/textService';
import { ControlText, CreateTextDto } from '../../data-access/text-formater/interfaces/text-interfaces';
import { InputEditTextControl } from '../../common-UI/component/input-edit-text-control/input-edit-text-control';
import { contentRequired } from '../../data-access/text-formater/validators/required-content';

@Component({
  selector: 'app-edit-text',
  imports: [ReactiveFormsModule, InputEditTextControl],
  templateUrl: './edit-text.html',
  styleUrl: './edit-text.scss',
})
export class EditText implements OnInit {
  #textServices = inject(TextService);
  idEditFile = signal<number | null>(null);
  inputControl = viewChild('inputControl', { read: ElementRef });

  editForm = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl('', Validators.required),
    content: new FormControl<ControlText>({ text: '', template: '' }, contentRequired),
  });

  ngOnInit() {
    this.editForm.valueChanges.subscribe((text) => {
    });
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
    this.editForm.reset();
  }

  onSaveText() {
    this.editForm.markAllAsTouched();
    this.editForm.updateValueAndValidity();
    if (!this.editForm.valid) return;
    const createText: CreateTextDto = {
      id: this.idEditFile(),
      title: this.editForm.controls.title.value ?? '',
      content: this.editForm.controls.content.value ?? { text: '', template: '' },
    };
    this.#textServices.addText(createText);
    this.editForm.setValue({
      id: null,
      title: '',
      content: {
        text: '',
        template: '',
      },
    });
    this.idEditFile.set(null);
  }
}
