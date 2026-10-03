using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpusHub.Api.Data;
using OpusHub.Api.Models;

namespace OpusHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class MusicasController : ControllerBase
{
    private readonly AppDbContext _context;

    // O ASP.NET injeta oautomaticametne a instância do DbContext via DI
    public MusicasController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/musicas
    // Retorna todas as músicas ou filtra por genero/tom se informado anteriormente
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Musica>>> GetMusicas(
        [FromQuery] string? genero,
        [FromQuery] string? tom)
    {
        var query = _context.Musicas.AsQueryable();
        if (!string.IsNullOrEmpty(genero))
        {
            query = query.Where(m => m.Genero.ToLower().Contains(genero.ToLower()));
        }
        if (!string.IsNullOrEmpty(tom))
        {
            query = query.Where(m => m.Tom.ToLower().Contains(tom.ToLower()));
        }
        return await query.OrderBy(m => m.Titulo).ToListAsync();
    }

    // GET: api/musicas/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<MusicasController>> GetMusica(int id)
    {
        var musica = await _context.Musicas.FindAsync(id);
        if (musica == null)
        {
            return NotFound(new { mensagem = $"Música com Id {id} não encontrada. " });
        }
        return Ok(musica);
    }

    // POST: api/musicas
    [HttpPost]
    public async Task<ActionResult<Musica>> PostMusica([FromBody] Musica musica)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        musica.DataCadastro = DateTime.UtcNow;
        _context.Musicas.Add(musica);
        await _context.SaveChangesAsync();

        // Retorna a resposta com o status 201 Created e o local da nova música
        return CreatedAtAction(nameof(GetMusica), new { id = musica.Id }, musica);
    }

    // PUT: api/musicas/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<Musica>> PutMusica(int id, [FromBody] Musica musicaAtualizada)
    {
        if (id != musicaAtualizada.Id)
        {
            return BadRequest(new { mensagem = "O ID da música não corresponde ao ID informado." });
        }

        var musicaExistente = await _context.Musicas.FindAsync(id);
        if (musicaExistente == null)
        {
            return NotFound(new { mensagem = $"Música com Id {id} não encontrada." });
        }

        musicaExistente.Titulo = musicaAtualizada.Titulo;
        musicaExistente.Artista = musicaAtualizada.Artista;
        musicaExistente.Album = musicaAtualizada.Album;
        musicaExistente.Bpm = musicaAtualizada.Bpm;
        musicaExistente.Tom = musicaAtualizada.Tom;
        musicaExistente.AnoLancamento = musicaAtualizada.AnoLancamento;
        musicaExistente.Genero = musicaAtualizada.Genero;
        musicaExistente.ConteudoCifra = musicaAtualizada.ConteudoCifra;

        await _context.SaveChangesAsync();

        return NoContent(); //HTTP 204 No Content, indicando que a atualização foi bem-sucedida, mas não há conteúdo para retornar.

    }

    // DELETE: api/musicas/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMusica(int id)
    {
        var musica = await _context.Musicas.FindAsync(id);
        if (musica == null)
        {
            return NotFound(new { mensagem = $"Música com Id {id} não encontrada." });
        }
        _context.Musicas.Remove(musica);
        await _context.SaveChangesAsync();
        return NoContent(); //HTTP 204 No Content, indicando que a exclusão foi bem-sucedida, mas não há conteúdo para retornar.
    }
}

