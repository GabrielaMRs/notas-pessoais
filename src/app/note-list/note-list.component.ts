import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes: any[] = [];
  noteToEdit: any = null;  // Variável para armazenar a nota que será editada

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.notes = this.noteService.getAll();
  }

  // Método para excluir uma nota
  delete(index: number) {
    this.noteService.delete(index);
    this.loadNotes();  // Recarregar a lista após exclusão
  }

  // Método para iniciar a edição de uma nota
  edit(index: number) {
    this.noteToEdit = { ...this.notes[index] };  // Clonar a nota para edição
    console.log(`Editando a nota no índice ${index}`, this.noteToEdit);
  }


  cancelEdit() {
    this.noteToEdit = null;  // Redefine a nota em edição para cancelar
  }

  // Método para salvar a nota editada
  saveEdit() {
    const index = this.notes.findIndex(note => note.id === this.noteToEdit.id);
    if (index !== -1) {
      this.noteService.update(index, this.noteToEdit);  // Atualizar a nota no serviço
      this.loadNotes();  // Recarregar a lista após a atualização
      this.noteToEdit = null;  // Limpar a nota em edição
    }
  }
}
