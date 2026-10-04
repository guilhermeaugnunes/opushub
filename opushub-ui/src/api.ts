import type { Musica } from './types';

const API_BASE_URL = 'http://localhost:5244/api/musicas';

export async function listarMusicas(genero?: string, tom?: string): Promise<Musica[]> {
    const params = new URLSearchParams();
    
    if (genero && genero.trim() !== '') {
        params.append('genero', genero.trim());
    }

    if (tom && tom?.trim() !== '') {
        params.append('tom', tom.trim());
    }

    const url = params.toString() ? `${API_BASE_URL}?${params.toString()}` : API_BASE_URL;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao listar músicas');
    }
    return response.json();
}

export async function cadastrarMusica(musica: Musica): Promise<Musica> {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(musica)
    });
    if (!response.ok) {
        throw new Error('Erro ao cadastrar música');
    }
    return response.json();
}

/*Para futura implementação:
export async function atualizarMusica(musica: Musica): Promise<Musica> {
    const response = await fetch(`${API_BASE_URL}/${musica.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(musica)
    });
    if (!response.ok) {
        throw new Error('Erro ao atualizar música');
    }
    return response.json();
}
*/

export async function excluirMusica(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Erro ao excluir música');
    }
}