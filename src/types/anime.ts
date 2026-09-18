export type AnimeStatus = 'assistindo' | 'assistido' | 'quero_assistir' | 'pausado';

export interface Anime {
  id: string;
  titulo: string;
  tituloOriginal?: string;
  capaUrl: string;
  status: AnimeStatus;
  episodiosVistos: number;
  totalEpisodios: number | null;
  nota: number; // 0 a 10
  favorito: boolean;
  generos: string[];
  anoLancamento?: number;
  comentario?: string;
  sinopse?: string;
  criadoEm: string;
}

export type ViewMode = 'grid' | 'list';

export type SortOption = 'nota_desc' | 'nota_asc' | 'titulo_asc' | 'titulo_desc' | 'recentes' | 'progresso_desc';
