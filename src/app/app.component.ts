import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  novaNota = {
    id: 0,
    titulo: '',
    conteudo: '',
    dataCriacao: new Date()
  };

  notas: any[] = []; // Array para armazenar as notas

  adicionarNota() {
    // Lógica para adicionar a nova nota à lista de notas
    this.notas.push(this.novaNota);
    // Reiniciar o formulário
    this.novaNota = { id: 0, titulo: '', conteudo: '', dataCriacao: new Date() };
  }

  remover(id: number) {
    // Remover a nota com o ID especificado
    this.notas = this.notas.filter(nota => nota.id !== id);
  }
}
