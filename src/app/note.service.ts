import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private storageKey = 'notas';

  constructor() {}

  // Adicionar uma nova nota
  add(note: any): void {
    const notes = this.getAll();
    notes.push(note);
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  // Obter todas as notas
  getAll(): any[] {
    const notes = localStorage.getItem(this.storageKey);
    return notes ? JSON.parse(notes) : [];
  }

  // Atualizar uma nota existente
  update(index: number, note: any): void {
    const notes = this.getAll();
    notes[index] = note;
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  // Remover uma nota
  delete(index: number): void {
    const notes = this.getAll();
    notes.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }
}
