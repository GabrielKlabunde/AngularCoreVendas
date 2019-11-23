using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Vendas.Model
{
        [Table("Pedidos")]
    public class Pedidos
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(20)]
        public string NumeroPedido { get; set; }
        public int Quantidade { get; set; }
        public int? Id_Produto { get; set; }
        public virtual Produtos Produtos { get; set; }
          
    }
}
