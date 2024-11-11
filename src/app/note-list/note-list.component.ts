import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: any[] = [];
  filteredNotes: any[] = [];
  searchTerm: string = '';
  noteToEditIndex: number | null = null;  // Índice da nota em edição
  addNoteForm: FormGroup;

  constructor(private noteService: NoteService, private fb: FormBuilder) {
    this.addNoteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notes = this.noteService.getAll();
    this.filteredNotes = this.notes;
  }

  delete(index: number) {
    this.noteService.delete(index);
    this.loadNotes();
    this.filterNotes();
  }

  // Função para iniciar a edição da nota com o índice específico
  edit(index: number) {
    this.noteToEditIndex = index;
  }

  cancelEdit() {
    this.noteToEditIndex = null; // Cancela a edição
  }

  saveEdit() {
    if (this.noteToEditIndex !== null) {
      this.noteService.update(this.noteToEditIndex, this.filteredNotes[this.noteToEditIndex]);
      this.loadNotes();
      this.noteToEditIndex = null;
    }
  }

  filterNotes() {
    if (this.searchTerm) {
      this.filteredNotes = this.notes.filter(note =>
        note.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredNotes = this.notes;
    }
  }
}
