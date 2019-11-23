import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../model/Produto';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
    button: string;
    produto: Produto;
    lista: Produto[];
    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.button = "Salvar";
        this.produto = new Produto();
        this.carregaLista();
  }
    cadastrar(): void {
        if (isNullOrUndefined(this.produto.id))
        {
            this.http.post('api/Vendas/InserirProduto', this.produto).subscribe(result => {
                this.carregaLista();
                this.limpaTela();
            }, error => console.log(error));
        }
        else {
            this.http.put(`api/Vendas/AlterarProduto/${this.produto.id}`, this.produto).subscribe(result => {
                this.carregaLista();
                this.button = "Salvar";
                this.produto.id = null;
            }, error => console.log(error));
        }
    }
    carregaLista(): void {
        this.http.get<Produto[]>('api/Vendas/RetornaProdutos').subscribe(result => {
            this.lista = result;
        }, error => console.log(error));
    }
    removerProduto(id: number): void {
        if (confirm('Deseja remover?')) {
            this.http.delete(`api/Vendas/RemoverProduto/${id}`).subscribe(result => {
                this.carregaLista();
            }, error => console.log(error))
        }
    }
    carregaCampos(id: number): void {
        let produto = this.lista.filter(x => x.id == id)[0];
        this.produto.descricao = produto.descricao;
        this.produto.preco = produto.preco;
        this.produto.id = produto.id;
        this.button = 'Editar';
    }
    limpaTela(): void {
        this.produto.descricao = "";
        this.produto.preco = null;
    }
}
