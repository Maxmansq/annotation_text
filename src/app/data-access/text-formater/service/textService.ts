import { Injectable, signal } from '@angular/core';
import { CreateTextDto, TextInterface } from '../interfaces/text-interfaces';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TextService {
  dataBase = signal<TextInterface[] | null>(null);

  edit = new Subject<TextInterface>();

  constructor() {
    const storageData = localStorage.getItem('CRUDtext');
    const data = storageData ? JSON.parse(storageData) : [];
    this.dataBase.set(data);
  }

  addText(text: CreateTextDto) {
    const data = this.dataBase();
    const editText: TextInterface = {
      id: !data ? 1 : data.length + 1,
      title: text.title,
      content: text.content,
    };
    this.dataBase.update((data) => {
      if (!data) {
        return [editText];
      }
      if (text.id) {
        data.splice(text.id - 1, 1, { ...editText, id: text.id });
        return [...data];
      }
      return [...data, editText];
    });
    localStorage.setItem('CRUDtext', JSON.stringify(this.dataBase()));
  }

  editText(idText: number) {
    const data = this.dataBase();
    if (!data) return;
    const editText = data.find((elem) => elem.id === idText);
    if (!editText) return;
    this.edit.next(editText);
  }

  deleteText(id: number) {
    let indexId = 0;
    this.dataBase.update((data) => {
      if (!data) return [];
      data.splice(id - 1, 1);
      return data.map((text) => {
        indexId++;
        return { ...text, id: indexId };
      });
    });
    window.localStorage.setItem('CRUDtext', JSON.stringify(this.dataBase()));
  }
}
