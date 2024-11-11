// src/app/note-form/note-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent {
  noteForm: FormGroup;  // FormGroup para o formulário de nota

  // Definindo o EventEmitter para o evento de nova nota
  @Output() noteAdded = new EventEmitter<void>();

  constructor(private noteService: NoteService, private fb: FormBuilder) {
    // Inicializando o FormGroup com validações
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  addNote() {
    if (this.noteForm.valid) {
      this.noteService.add(this.noteForm.value);  // Adiciona a nota através do serviço
      this.noteForm.reset();  // Limpa o formulário após adicionar a nota
      this.noteAdded.emit();  // Emite o evento de nova nota
    } else {
      // Marca todos os campos como 'touched' para exibir erros caso existam
      this.noteForm.markAllAsTouched();
    }
  }
}
