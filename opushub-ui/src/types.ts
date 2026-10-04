export interface Musica {
    id?: number;
    titulo: string;
    artista: string;
    album?: string;
    tom?: string;
    bpm: number;
    anoLancamento?: number;
    genero?: string;
    conteudoCifra?: string;
    dataCadastro?: string;
}