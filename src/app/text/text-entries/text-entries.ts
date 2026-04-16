import { Component, computed, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TextService } from '../service/textService';

@Component({
  selector: 'app-text-entries',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './text-entries.html',
  styleUrl: './text-entries.scss',
})
export class TextEntries {
  displayedColumns = ['id', 'title', 'text', 'action'];
  #textServices = inject(TextService);
  dataSource = computed(() => this.#textServices.dataBase() ?? []);

  onEdit(id: number) {
    if (!id) return
    this.#textServices.editText(id)
  };
}
