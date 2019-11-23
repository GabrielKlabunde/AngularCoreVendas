using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vendas.Model;

namespace Vendas.Data
{
    public class VendasDbContext:DbContext
    {
        public DbSet<Produtos> Produtos { get; set; }
        public DbSet<Pedidos> Pedidos { get; set; }
        public VendasDbContext(DbContextOptions<VendasDbContext> options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pedidos>()
                 .HasOne(p => p.Produtos)
                 .WithMany().HasForeignKey(p => p.Id_Produto);
        }
    }
}
