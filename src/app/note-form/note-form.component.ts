// src/app/note-form/note-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent {
  note = { title: '', content: '' };

  // Definindo o EventEmitter para o evento de nova nota
  @Output() noteAdded = new EventEmitter<void>();

  constructor(private noteService: NoteService) {}

  addNote() {
    this.noteService.add(this.note);
    this.note = { title: '', content: '' };  // Limpar o formulário
    this.noteAdded.emit();  // Emitir evento de nova nota
  }
}
