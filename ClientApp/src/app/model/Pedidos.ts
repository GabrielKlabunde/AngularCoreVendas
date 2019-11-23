import { Produto } from './Produto'
export class Pedido {
    id: number;
    numeroPedido: string;
    quantidade: number;
    id_produto: number;
    produtos: Produto;

}
