using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Vendas.Model
{
        [Table("Produtos")]
    public class Produtos
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(200)]
        public string Descricao { get; set; }
        public double Preco { get; set; }
    }
}
