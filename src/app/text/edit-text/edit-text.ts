import {
  Component, ElementRef,
  inject,
  OnInit,
  signal, viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextService } from '../service/textService';
import { ControlText, CreateTextDto } from '../interfaces/text-interfaces';
import { InputEditTextControl } from '../../common-UI/component/input-edit-text-control/input-edit-text-control';

@Component({
  selector: 'app-edit-text',
  imports: [ReactiveFormsModule, InputEditTextControl],
  templateUrl: './edit-text.html',
  styleUrl: './edit-text.scss',
})
export class EditText implements OnInit {
  #textServices = inject(TextService);
  idEditFile = signal<number | null>(null);
  inputControl = viewChild('inputControl', {read: ElementRef});

  editForm = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl('', { nonNullable: true }),
    content: new FormControl<ControlText>({text: '', template: ''}, { nonNullable: true }),
  });

  ngOnInit() {
    this.editForm.valueChanges.subscribe((text) => {
      console.log(text);
    })
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
    this.editForm.setValue({
      id: null,
      title: '',
      content: {
        text: '',
        template: ''
      }
    });
    this.idEditFile.set(null);
  }
}
