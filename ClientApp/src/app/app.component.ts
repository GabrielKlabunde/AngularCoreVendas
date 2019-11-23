import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private route: Router) { }
    title = 'ClientApp';
    mensagem = 'Bem vindo ao Projeto Vendas'
    visible = true;
    produtos(): void {
        this.visible = false;
        this.route.navigate(['/Produto']);
    }
    pedidos(): void {
        this.visible = false;
        this.route.navigate(['/Pedido']);
    }
}
