import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Anime, AnimeStatus, SortOption, ViewMode } from '../types/anime';

const STORAGE_KEY = 'anivault_animes_data_v1';

const MOCK_ANIMES_INICIAIS: Anime[] = [
  {
    id: 'frieren-001',
    titulo: 'Sousou no Frieren',
    tituloOriginal: '葬送のフリーレン',
    capaUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
    status: 'assistido',
    episodiosVistos: 28,
    totalEpisodios: 28,
    nota: 10,
    favorito: true,
    generos: ['Aventura', 'Drama', 'Fantasia'],
    anoLancamento: 2023,
    comentario: 'Uma obra-prima absoluta sobre a passagem do tempo e valor das conexões.',
    sinopse: 'A maga elfa Frieren e seus corajosos companheiros derrotaram o Rei Demônio e trouxeram paz ao reino. Décadas depois, Frieren embarca em uma nova jornada de redescoberta.',
    criadoEm: '2024-01-15T10:00:00.000Z',
  },
  {
    id: 'jujutsu-002',
    titulo: 'Jujutsu Kaisen Season 2',
    tituloOriginal: '呪術廻戦 懐玉・玉折 / 渋谷事変',
    capaUrl: 'https://cdn.myanimelist.net/images/anime/1792/138042.jpg',
    status: 'assistindo',
    episodiosVistos: 18,
    totalEpisodios: 23,
    nota: 9.5,
    favorito: true,
    generos: ['Ação', 'Sobrenatural', 'Shounen'],
    anoLancamento: 2023,
    comentario: 'Arco do Incidente de Shibuya tem uma animação insana e ritmo frenético.',
    sinopse: 'O passado de Gojo e Geto é revelado, culminando no terrível incidente de Shibuya onde os feiticeiros enfrentam maldições de nível especial.',
    criadoEm: '2024-02-01T12:00:00.000Z',
  },
  {
    id: 'sololeveling-003',
    titulo: 'Solo Leveling',
    tituloOriginal: '俺だけレベルアップな件',
    capaUrl: 'https://cdn.myanimelist.net/images/anime/1598/141042.jpg',
    status: 'quero_assistir',
    episodiosVistos: 0,
    totalEpisodios: 12,
    nota: 8.5,
    favorito: false,
    generos: ['Ação', 'Fantasia', 'Aventura'],
    anoLancamento: 2024,
    comentario: 'Recomendado por muitos amigos pela intensidade das lutas.',
    sinopse: 'Sung Jinwoo, conhecido como o caçador mais fraco de toda a humanidade, se vê à beira da morte em uma masmorra dupla misteriosa até receber um poder único de subir de nível.',
    criadoEm: '2024-03-10T14:30:00.000Z',
  },
  {
    id: 'aot-004',
    titulo: 'Attack on Titan (Shingeki no Kyojin)',
    tituloOriginal: '進撃の巨人',
    capaUrl: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    status: 'assistido',
    episodiosVistos: 89,
    totalEpisodios: 89,
    nota: 10,
    favorito: true,
    generos: ['Ação', 'Mistério', 'Drama'],
    anoLancamento: 2013,
    comentario: 'Roteiro perfeito e reviravoltas inesquecíveis.',
    sinopse: 'A humanidade vive cercada por muralhas gigantescas para se proteger de titãs devoradores. Eren Yeager jura exterminar todos eles após a queda de sua cidade natal.',
    criadoEm: '2023-11-20T08:00:00.000Z',
  },
  {
    id: 'demon-slayer-005',
    titulo: 'Demon Slayer: Kimetsu no Yaiba',
    tituloOriginal: '鬼滅の刃',
    capaUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    status: 'assistindo',
    episodiosVistos: 44,
    totalEpisodios: 55,
    nota: 9.0,
    favorito: false,
    generos: ['Ação', 'Sobrenatural', 'Histórico'],
    anoLancamento: 2019,
    comentario: 'Efeitos visuais e trilha sonora impecáveis.',
    sinopse: 'Tanjiro Kamado se torna um caçador de demônios para curar sua irmã Nezuko e vingar sua família assassinada.',
    criadoEm: '2024-01-10T19:00:00.000Z',
  },
  {
    id: 'edgerunners-006',
    titulo: 'Cyberpunk: Edgerunners',
    tituloOriginal: 'サイバーパンク エッジランナーズ',
    capaUrl: 'https://cdn.myanimelist.net/images/anime/1861/126588.jpg',
    status: 'assistido',
    episodiosVistos: 10,
    totalEpisodios: 10,
    nota: 9.7,
    favorito: true,
    generos: ['Ficção Científica', 'Ação', 'Cyberpunk'],
    anoLancamento: 2022,
    comentario: 'Estética neon vibrante pelo Studio Trigger. Final emocionante.',
    sinopse: 'David Martinez, um jovem talentoso em Night City, se torna um mercenário fora-da-lei após perder tudo.',
    criadoEm: '2023-12-05T21:00:00.000Z',
  },
  {
    id: 'one-piece-007',
    titulo: 'One Piece',
    tituloOriginal: 'ワンピース',
    capaUrl: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    status: 'assistindo',
    episodiosVistos: 1095,
    totalEpisodios: null,
    nota: 9.8,
    favorito: true,
    generos: ['Aventura', 'Ação', 'Comédia'],
    anoLancamento: 1999,
    comentario: 'A maior aventura do mundo dos animes. Arco de Egghead sensacional!',
    sinopse: 'Monkey D. Luffy navega pelos mares com sua tripulação em busca do lendário tesouro One Piece para se tornar o Rei dos Piratas.',
    criadoEm: '2023-08-01T15:00:00.000Z',
  },
  {
    id: 'spirited-away-008',
    titulo: 'A Viagem de Chihiro (Spirited Away)',
    tituloOriginal: '千と千尋の神隠し',
    capaUrl: 'https://cdn.myanimelist.net/images/anime/4/23082.jpg',
    status: 'quero_assistir',
    episodiosVistos: 0,
    totalEpisodios: 1,
    nota: 9.0,
    favorito: false,
    generos: ['Fantasia', 'Aventura', 'Sobrenatural'],
    anoLancamento: 2001,
    comentario: 'Filme lendário do Studio Ghibli guardado para assistir com calma.',
    sinopse: 'Durante a mudança de sua família para o subúrbio, a jovem Chihiro entra acidentalmente em um mundo governado por deuses, bruxas e espíritos.',
    criadoEm: '2024-02-28T16:00:00.000Z',
  },
];

export const useAnimeStore = defineStore('anime', () => {
  // Estado inicial carregado do localStorage com fallback para os mocks
  const carregarAnimesSalvos = (): Anime[] => {
    try {
      const dados = localStorage.getItem(STORAGE_KEY);
      if (dados) {
        const parsed = JSON.parse(dados);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Erro ao ler animes do localStorage:', e);
    }
    return MOCK_ANIMES_INICIAIS;
  };

  const animes = ref<Anime[]>(carregarAnimesSalvos());

  // Salvar no localStorage sempre que houver alteração
  const salvarNoStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animes.value));
    } catch (e) {
      console.error('Erro ao salvar animes no localStorage:', e);
    }
  };

  // Filtros e opções de visualização
  const filtroStatus = ref<AnimeStatus | 'todos' | 'favoritos'>('todos');
  const buscaTexto = ref<string>('');
  const filtroGenero = ref<string>('todos');
  const ordenacao = ref<SortOption>('nota_desc');
  const modoVisualizacao = ref<ViewMode>('grid');

  // Anime selecionado para modal de edição / detalhes
  const animeEmEdicao = ref<Anime | null>(null);
  const animeEmDetalhes = ref<Anime | null>(null);
  const isFormModalOpen = ref<boolean>(false);
  const isDetailModalOpen = ref<boolean>(false);

  // Lista de todos os gêneros únicos cadastrados
  const todosGeneros = computed(() => {
    const set = new Set<string>();
    animes.value.forEach((a) => {
      a.generos.forEach((g) => set.add(g));
    });
    return Array.from(set).sort();
  });

  // Estatísticas computadas para o HeroStats
  const totalAnimes = computed(() => animes.value.length);
  const totalAssistidos = computed(
    () => animes.value.filter((a) => a.status === 'assistido').length
  );
  const totalAssistindo = computed(
    () => animes.value.filter((a) => a.status === 'assistindo').length
  );
  const totalQueroAssistir = computed(
    () => animes.value.filter((a) => a.status === 'quero_assistir').length
  );
  const totalFavoritos = computed(
    () => animes.value.filter((a) => a.favorito).length
  );
  const totalEpisodiosVistos = computed(() =>
    animes.value.reduce((acc, a) => acc + (a.episodiosVistos || 0), 0)
  );

  // Animes filtrados e ordenados
  const animesFiltrados = computed(() => {
    let resultado = [...animes.value];

    // Filtro de Status / Favoritos
    if (filtroStatus.value === 'favoritos') {
      resultado = resultado.filter((a) => a.favorito);
    } else if (filtroStatus.value !== 'todos') {
      resultado = resultado.filter((a) => a.status === filtroStatus.value);
    }

    // Filtro de Gênero
    if (filtroGenero.value !== 'todos') {
      resultado = resultado.filter((a) =>
        a.generos.includes(filtroGenero.value)
      );
    }

    // Filtro de Busca por Texto
    const busca = buscaTexto.value.trim().toLowerCase();
    if (busca) {
      resultado = resultado.filter(
        (a) =>
          a.titulo.toLowerCase().includes(busca) ||
          (a.tituloOriginal && a.tituloOriginal.toLowerCase().includes(busca)) ||
          a.generos.some((g) => g.toLowerCase().includes(busca))
      );
    }

    // Ordenação
    resultado.sort((a, b) => {
      switch (ordenacao.value) {
        case 'nota_desc':
          return (b.nota || 0) - (a.nota || 0);
        case 'nota_asc':
          return (a.nota || 0) - (b.nota || 0);
        case 'titulo_asc':
          return a.titulo.localeCompare(b.titulo);
        case 'titulo_desc':
          return b.titulo.localeCompare(a.titulo);
        case 'recentes':
          return new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime();
        case 'progresso_desc':
          return (b.episodiosVistos || 0) - (a.episodiosVistos || 0);
        default:
          return 0;
      }
    });

    return resultado;
  });

  // Ações CRUD
  const adicionarAnime = (novo: Omit<Anime, 'id' | 'criadoEm'>) => {
    const novoAnime: Anime = {
      ...novo,
      id: 'anime-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      criadoEm: new Date().toISOString(),
    };
    animes.value.unshift(novoAnime);
    salvarNoStorage();
    return novoAnime;
  };

  const editarAnime = (id: string, dados: Partial<Anime>) => {
    const index = animes.value.findIndex((a) => a.id === id);
    if (index !== -1) {
      const atual = animes.value[index];
      if (atual) {
        animes.value[index] = {
          ...atual,
          ...dados,
          id: atual.id,
          criadoEm: atual.criadoEm,
        };
        salvarNoStorage();
      }
    }
  };

  const removerAnime = (id: string) => {
    animes.value = animes.value.filter((a) => a.id !== id);
    salvarNoStorage();
  };

  const alterarStatus = (id: string, novoStatus: AnimeStatus) => {
    const anime = animes.value.find((a) => a.id === id);
    if (anime) {
      anime.status = novoStatus;
      // Se marcou como assistido e tem total de episódios conhecido, ajusta episódios vistos
      if (novoStatus === 'assistido' && anime.totalEpisodios) {
        anime.episodiosVistos = anime.totalEpisodios;
      }
      salvarNoStorage();
    }
  };

  const incrementarEpisodio = (id: string) => {
    const anime = animes.value.find((a) => a.id === id);
    if (anime) {
      if (anime.totalEpisodios === null || anime.episodiosVistos < anime.totalEpisodios) {
        anime.episodiosVistos += 1;
        // Se atingiu o total de episódios, muda status automaticamente para assistido
        if (anime.totalEpisodios !== null && anime.episodiosVistos >= anime.totalEpisodios) {
          anime.status = 'assistido';
        } else if (anime.status === 'quero_assistir') {
          anime.status = 'assistindo';
        }
        salvarNoStorage();
      }
    }
  };

  const decrementarEpisodio = (id: string) => {
    const anime = animes.value.find((a) => a.id === id);
    if (anime && anime.episodiosVistos > 0) {
      anime.episodiosVistos -= 1;
      if (anime.status === 'assistido') {
        anime.status = 'assistindo';
      }
      salvarNoStorage();
    }
  };

  const alternarFavorito = (id: string) => {
    const anime = animes.value.find((a) => a.id === id);
    if (anime) {
      anime.favorito = !anime.favorito;
      salvarNoStorage();
    }
  };

  // Modais
  const abrirModalCadastro = () => {
    animeEmEdicao.value = null;
    isFormModalOpen.value = true;
  };

  const abrirModalEdicao = (anime: Anime) => {
    animeEmEdicao.value = { ...anime };
    isFormModalOpen.value = true;
  };

  const abrirModalDetalhes = (anime: Anime) => {
    animeEmDetalhes.value = anime;
    isDetailModalOpen.value = true;
  };

  const fecharModais = () => {
    isFormModalOpen.value = false;
    isDetailModalOpen.value = false;
    animeEmEdicao.value = null;
    animeEmDetalhes.value = null;
  };

  // Backup e Restauração
  const exportarBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(animes.value, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `anivault_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importarBackup = (conteudoJson: string): boolean => {
    try {
      const parsed = JSON.parse(conteudoJson);
      if (Array.isArray(parsed)) {
        animes.value = parsed;
        salvarNoStorage();
        return true;
      }
    } catch (e) {
      console.error('Falha ao importar backup JSON:', e);
    }
    return false;
  };

  const resetarCatalogo = () => {
    animes.value = [...MOCK_ANIMES_INICIAIS];
    salvarNoStorage();
  };

  return {
    animes,
    animesFiltrados,
    filtroStatus,
    buscaTexto,
    filtroGenero,
    ordenacao,
    modoVisualizacao,
    todosGeneros,
    totalAnimes,
    totalAssistidos,
    totalAssistindo,
    totalQueroAssistir,
    totalFavoritos,
    totalEpisodiosVistos,
    animeEmEdicao,
    animeEmDetalhes,
    isFormModalOpen,
    isDetailModalOpen,
    adicionarAnime,
    editarAnime,
    removerAnime,
    alterarStatus,
    incrementarEpisodio,
    decrementarEpisodio,
    alternarFavorito,
    abrirModalCadastro,
    abrirModalEdicao,
    abrirModalDetalhes,
    fecharModais,
    exportarBackup,
    importarBackup,
    resetarCatalogo,
  };
});
