using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vendas.Data;
using Vendas.Model;

namespace Vendas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendasController : ControllerBase
    {
        private readonly VendasDbContext _db;
        public VendasController(VendasDbContext db)
        {
            this._db = db;
        }
        [HttpGet("[action]")]

        public IEnumerable<Produtos> RetornaProdutos()
        {
            return _db.Produtos.OrderBy(x => x.Descricao);
        }
        [HttpPost("[action]")]
        public void InserirProduto([FromBody]Produtos produto)
        {
            _db.Produtos.Add(produto);
            _db.SaveChanges();
        }
        [HttpPut("[action]/{id}")]
        public void AlterarProduto(int id, [FromBody] Produtos produto)
        {
            var produtoOld = _db.Produtos.Find(id);
            produtoOld.Descricao = produto.Descricao;
            produtoOld.Preco = produto.Preco;
            _db.SaveChanges();
        }
        [HttpDelete("[action]/{id}")]
        public void RemoverProduto(int id)
        {
            var produto = _db.Produtos.Find(id);
            _db.Produtos.Remove(produto);
            _db.SaveChanges();
        }
        [HttpPost("[action]")]
        public void InserirPedido([FromBody] Pedidos pedido)
        {
            pedido.Produtos = _db.Produtos.Find(pedido.Id_Produto);
            _db.Pedidos.Add(pedido);
            _db.SaveChanges();
        }
        [HttpGet("[action]")]

        public List<Pedidos> RetornaPedidos()
        {
            var select = from pedidos in _db.Pedidos
                         join produtos in _db.Produtos
                         on pedidos.Id_Produto equals produtos.Id
                         select new Pedidos
                         {
                             NumeroPedido = pedidos.NumeroPedido,
                             Id = pedidos.Id,
                             Id_Produto = produtos.Id,
                             Quantidade = pedidos.Quantidade,
                             Produtos = produtos
                         };
            return select.ToList();
        }
        [HttpDelete("[action]/{id}")]

        public void RemoverPedido(int id)
        {
            var pedido = _db.Pedidos.Find(id);
            _db.Pedidos.Remove(pedido);
            _db.SaveChanges();
        }

        [HttpPut("[action]/{id}")]

        public void AlterarPedido(int id, [FromBody] Pedidos pedido)
        {
            var pedidoOld = _db.Pedidos.Find(id);
            pedidoOld.NumeroPedido = pedido.NumeroPedido;
            pedidoOld.Quantidade = pedido.Quantidade;
            _db.SaveChanges();
        }

       

    }
}