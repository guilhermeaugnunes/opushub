import React, { useEffect, useState } from 'react';
import type { Musica } from './types';
import { listarMusicas, cadastrarMusica, excluirMusica } from './api';

export default function App() {
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  // Estados do formulário de cadastro
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [tom, setTom] = useState('C');
  const [bpm, setBpm] = useState<number>(80);
  const [genero, setGenero] = useState('');
  const [conteudoCifra, setConteudoCifra] = useState('');

  // Estados dos filtros de busca
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroTom, setFiltroTom] = useState('');

  const carregarDados = async (generoBusca?: string, tomBusca?: string) => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await listarMusicas(generoBusca, tomBusca);
      setMusicas(dados);
    } catch (err) {
      setErro((err as Error).message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleFiltrar = (e: React.FormEvent) => {
    e.preventDefault();
    carregarDados(filtroGenero, filtroTom);
  };

  const handleLimparFiltro = () => {
    setFiltroGenero('');
    setFiltroTom('');
    carregarDados();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !artista.trim()) {
      alert('Título e Artista são obrigatórios!');
      return;
    }

    try {
      await cadastrarMusica({
        titulo,
        artista,
        tom,
        bpm: Number(bpm),
        genero,
        conteudoCifra,
      });

      setTitulo('');
      setArtista('');
      setConteudoCifra('');
      setGenero('');

      await carregarDados(filtroGenero, filtroTom);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (confirm('Deseja realmente remover esta música do acervo?')) {
      try {
        await excluirMusica(id);
        await carregarDados(filtroGenero, filtroTom);
      } catch (err) {
        alert((err as Error).message);
      }
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>🎵 OpusHub</h1>
        <p style={{ color: '#666' }}>Painel de Gestão de Repertório &amp; Cifras</p>
      </header>

      {/* Formulário de Cadastro */}
      <section style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3>Cadastrar Nova Obra</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Título *</label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Artista / Compositor *</label>
            <input
              type="text"
              required
              value={artista}
              onChange={(e) => setArtista(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Tonalidade</label>
            <input
              type="text"
              placeholder="Ex: C, Am, F#"
              value={tom}
              onChange={(e) => setTom(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>BPM (Andamento)</label>
            <input
              type="number"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Gênero</label>
            <input
              type="text"
              placeholder="Ex: Samba, Choro, Clássico"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Cifra / Estrutura Harmônica</label>
            <textarea
              rows={4}
              placeholder="Cole os acordes ou guia harmônico aqui..."
              value={conteudoCifra}
              onChange={(e) => setConteudoCifra(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', fontFamily: 'monospace' }}
            />
          </div>

          <button
            type="submit"
            style={{
              gridColumn: 'span 2',
              padding: '0.75rem',
              backgroundColor: '#0066cc',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Adicionar ao Repertório
          </button>
        </form>
      </section>

      {/* Seção de Filtros e Busca */}
      <section style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <form onSubmit={handleFiltrar} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '160px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Filtrar por Gênero</label>
            <input
              type="text"
              placeholder="Ex: Samba"
              value={filtroGenero}
              onChange={(e) => setFiltroGenero(e.target.value)}
              style={{ width: '100%', padding: '0.45rem' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '120px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Filtrar por Tom</label>
            <input
              type="text"
              placeholder="Ex: C"
              value={filtroTom}
              onChange={(e) => setFiltroTom(e.target.value)}
              style={{ width: '100%', padding: '0.45rem' }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Filtrar
          </button>
          {(filtroGenero || filtroTom) && (
            <button
              type="button"
              onClick={handleLimparFiltro}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Limpar
            </button>
          )}
        </form>
      </section>

      {/* Listagem */}
      <section>
        <h3>Músicas Cadastradas ({musicas.length})</h3>

        {carregando && <p>Carregando acervo...</p>}
        {erro && <p style={{ color: 'red' }}>Erro ao conectar com a API: {erro}</p>}

        {!carregando && musicas.length === 0 && (
          <p style={{ color: '#888' }}>Nenhuma música encontrada.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {musicas.map((m) => (
            <div
              key={m.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                backgroundColor: '#fff',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{m.titulo}</h4>
                <p style={{ margin: '0 0 0.5rem 0', color: '#555' }}>
                  <strong>Artista:</strong> {m.artista} {m.genero && `| ${m.genero}`}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#777' }}>
                  <span><strong>Tom:</strong> {m.tom || 'N/A'}</span>
                  <span><strong>BPM:</strong> {m.bpm}</span>
                </div>
                {m.conteudoCifra && (
                  <pre
                    style={{
                      marginTop: '0.75rem',
                      background: '#f4f4f4',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      overflowX: 'auto',
                    }}
                  >
                    {m.conteudoCifra}
                  </pre>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(m.id)}
                style={{
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.4rem 0.8rem',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}