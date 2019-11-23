import { Component, OnInit } from '@angular/core';
import { Pedido } from '../model/Pedidos';
import { Produto } from '../model/Produto';
import { parse } from 'url';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.component.html',
    styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
    pedido: Pedido;
    produtos: Produto[];
    idProduto: string;
    pedidos: Pedido[];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.pedido = new Pedido();
        this.carregaProdutos();
        this.carregaListaPedidos();
    }
    carregaProdutos(): void {
        this.http.get<Produto[]>('api/Vendas/RetornaProdutos').subscribe(result => {
            this.produtos = result;
        }, error => console.log(error));
    }
    cadastroPedido(): void {
        if (isNullOrUndefined(this.pedido.id)) {
            this.pedido.id_produto = parseInt(this.idProduto);
            this.http.post('api/Vendas/InserirPedido', this.pedido).subscribe(result => {
                this.carregaListaPedidos();
                this.limpaTela();
            }, error => console.log(error));
        }
        else {
            this.http.put(`api/Vendas/AlterarPedido/${this.pedido.id}`, this.pedido).subscribe(result => {
                this.carregaListaPedidos();
                this.limpaTela();
                this.pedido.id = null;
            }, error => console.log(error));
        }
    }
    carregaListaPedidos(): void {
        this.http.get<Pedido[]>('api/Vendas/Retornapedidos').subscribe(result => {
            this.pedidos = result;
        }, error => console.log(error));
    }
    limpaTela(): void {
        this.pedido.numeroPedido = "";
        this.pedido.quantidade = null;
        this.idProduto = null;
       
   
    }
    removerPedido(id): void {
        if (confirm('Deseja remover esse pedido?')) {
            this.http.delete(`api/Vendas/RemoverPedido/${id}`).subscribe(result => {
                this.carregaListaPedidos();
            }, error => console.log(error));
        }
    }
    carregaPedido(id: number): void {
        let pedido = this.pedidos.filter(x => x.id == id)[0];
        this.pedido.numeroPedido = pedido.numeroPedido;
        this.pedido.quantidade = pedido.quantidade;
        this.pedido.id = pedido.id;
        this.idProduto = pedido.produtos.id.toString();

    }
}
