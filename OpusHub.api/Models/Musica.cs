namespace OpusHub.Api.Models;

public class Musica
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Artista { get; set; } = string.Empty;
    public string? Album { get; set; }
    public int Bpm { get; set; }
    public string Tom { get; set; } = string.Empty;
    public int AnoLancamento { get; set; }
    public string Genero { get; set; } = string.Empty;
    public string? ConteudoCifra { get; set; }
    public DateTime DataCadastro { get; set; } = DateTime.UtcNow;
}