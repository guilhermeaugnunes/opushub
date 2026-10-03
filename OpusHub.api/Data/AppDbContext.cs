using Microsoft.EntityFrameworkCore;
using OpusHub.Api.Models;

namespace OpusHub.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<Musica> Musicas => Set <Musica>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

      // Configurações adicionais do modelo 
      modelBuilder.Entity<Musica>(entity =>
        {
            entity.HasKey(m => m.Id);
            entity.Property(m => m.Titulo).IsRequired().HasMaxLength(200);
            entity.Property(m => m.Artista).IsRequired().HasMaxLength(200);
            entity.Property(m => m.Album).HasMaxLength(200);
            entity.Property(m => m.Bpm).IsRequired();
            entity.Property(m => m.Tom).IsRequired().HasMaxLength(10);
            entity.Property(m => m.AnoLancamento).IsRequired();
            entity.Property(m => m.Genero).HasMaxLength(100);
            entity.Property(m => m.ConteudoCifra);
            entity.Property(m => m.DataCadastro).HasDefaultValueSql("GETUTCDATE()");
        });
    }
}

