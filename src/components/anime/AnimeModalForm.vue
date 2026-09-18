<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAnimeStore } from '../../stores/animeStore';
import type { Anime, AnimeStatus } from '../../types/anime';

const store = useAnimeStore();

const isEdicao = ref(false);

const form = ref<{
  id?: string;
  titulo: string;
  tituloOriginal: string;
  capaUrl: string;
  status: AnimeStatus;
  episodiosVistos: number;
  totalEpisodios: number | null;
  nota: number;
  favorito: boolean;
  generosTexto: string;
  anoLancamento: number | null;
  comentario: string;
  sinopse: string;
}>({
  titulo: '',
  tituloOriginal: '',
  capaUrl: '',
  status: 'quero_assistir',
  episodiosVistos: 0,
  totalEpisodios: 12,
  nota: 8.0,
  favorito: false,
  generosTexto: 'Ação, Fantasia',
  anoLancamento: new Date().getFullYear(),
  comentario: '',
  sinopse: '',
});

// Gêneros rápidos para clique
const generosSugeridos = [
  'Ação', 'Aventura', 'Comédia', 'Drama', 'Fantasia', 
  'Ficção Científica', 'Romance', 'Shounen', 'Seinen', 'Sobrenatural'
];

const adicionarGeneroRapido = (genero: string) => {
  const lista = form.value.generosTexto
    .split(',')
    .map((g) => g.trim())
    .filter((g) => g.length > 0);

  if (!lista.includes(genero)) {
    lista.push(genero);
    form.value.generosTexto = lista.join(', ');
  }
};

// Sincronizar quando abrir o modal em modo edição ou novo
watch(
  () => store.animeEmEdicao,
  (anime) => {
    if (anime) {
      isEdicao.value = true;
      form.value = {
        id: anime.id,
        titulo: anime.titulo,
        tituloOriginal: anime.tituloOriginal || '',
        capaUrl: anime.capaUrl,
        status: anime.status,
        episodiosVistos: anime.episodiosVistos,
        totalEpisodios: anime.totalEpisodios,
        nota: anime.nota,
        favorito: anime.favorito,
        generosTexto: anime.generos.join(', '),
        anoLancamento: anime.anoLancamento || null,
        comentario: anime.comentario || '',
        sinopse: anime.sinopse || '',
      };
    } else {
      isEdicao.value = false;
      form.value = {
        titulo: '',
        tituloOriginal: '',
        capaUrl: '',
        status: 'quero_assistir',
        episodiosVistos: 0,
        totalEpisodios: 12,
        nota: 8.0,
        favorito: false,
        generosTexto: 'Ação, Aventura',
        anoLancamento: new Date().getFullYear(),
        comentario: '',
        sinopse: '',
      };
    }
  },
  { immediate: true }
);

const salvar = () => {
  if (!form.value.titulo.trim()) {
    alert('Por favor, informe o título do anime.');
    return;
  }

  // Capa padrão se o usuário não preencheu
  const capaFinal = form.value.capaUrl.trim() || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80';

  const generosArray = form.value.generosTexto
    .split(',')
    .map((g) => g.trim())
    .filter((g) => g.length > 0);

  if (isEdicao.value && form.value.id) {
    store.editarAnime(form.value.id, {
      titulo: form.value.titulo.trim(),
      tituloOriginal: form.value.tituloOriginal.trim() || undefined,
      capaUrl: capaFinal,
      status: form.value.status,
      episodiosVistos: Number(form.value.episodiosVistos) || 0,
      totalEpisodios: form.value.totalEpisodios !== null ? Number(form.value.totalEpisodios) : null,
      nota: Number(form.value.nota) || 0,
      favorito: form.value.favorito,
      generos: generosArray.length > 0 ? generosArray : ['Anime'],
      anoLancamento: form.value.anoLancamento ? Number(form.value.anoLancamento) : undefined,
      comentario: form.value.comentario.trim() || undefined,
      sinopse: form.value.sinopse.trim() || undefined,
    });
  } else {
    store.adicionarAnime({
      titulo: form.value.titulo.trim(),
      tituloOriginal: form.value.tituloOriginal.trim() || undefined,
      capaUrl: capaFinal,
      status: form.value.status,
      episodiosVistos: Number(form.value.episodiosVistos) || 0,
      totalEpisodios: form.value.totalEpisodios !== null ? Number(form.value.totalEpisodios) : null,
      nota: Number(form.value.nota) || 0,
      favorito: form.value.favorito,
      generos: generosArray.length > 0 ? generosArray : ['Anime'],
      anoLancamento: form.value.anoLancamento ? Number(form.value.anoLancamento) : undefined,
      comentario: form.value.comentario.trim() || undefined,
      sinopse: form.value.sinopse.trim() || undefined,
    });
  }

  store.fecharModais();
};
</script>

<template>
  <!-- Backdrop do Modal -->
  <div
    v-if="store.isFormModalOpen"
    class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3"
    @click.self="store.fecharModais()"
  >
    <div class="glass-panel anivault-modal-content w-100 p-0 overflow-hidden shadow-2xl" style="max-width: 680px;">
      
      <!-- Cabeçalho do Modal -->
      <div class="anivault-modal-header p-4 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-2">
          <div class="modal-icon-badge">
            <i class="bi" :class="isEdicao ? 'bi-pencil-square text-primary' : 'bi-plus-circle-fill text-accent'"></i>
          </div>
          <div>
            <h5 class="modal-title fw-bold text-white mb-0 font-display">
              {{ isEdicao ? 'Editar Anime' : 'Adicionar Novo Anime ao AniVault' }}
            </h5>
            <small class="text-muted">Preencha as informações para registrar na sua coleção</small>
          </div>
        </div>

        <button type="button" class="btn-close btn-close-white" @click="store.fecharModais()"></button>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="salvar" class="p-4">
        <div class="row g-3">

          <!-- Preview da Capa e Campo de URL -->
          <div class="col-md-4 text-center">
            <label class="form-label text-muted small fw-semibold d-block text-start">Prévia da Capa</label>
            <div class="cover-preview-box rounded-3 overflow-hidden position-relative mx-auto mb-2">
              <img
                :src="form.capaUrl || 'https://placehold.co/400x600/14192b/f8fafc?text=Insira+URL+da+Capa'"
                alt="Prévia"
                class="w-100 h-100 object-fit-cover"
                @error="(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/400x600/14192b/f8fafc?text=Capa+Invalida')"
              />
            </div>
            <small class="text-muted text-xs d-block">Recomendado formato vertical (2:3)</small>
          </div>

          <!-- Campos Principais -->
          <div class="col-md-8">
            <!-- Título Principal -->
            <div class="mb-3">
              <label class="form-label text-white fw-semibold small">Título do Anime *</label>
              <input
                type="text"
                v-model="form.titulo"
                class="form-control anivault-input"
                placeholder="Ex: Demon Slayer, Frieren, Naruto..."
                required
              />
            </div>

            <!-- Título Original / Japonês -->
            <div class="mb-3">
              <label class="form-label text-muted small">Título Original (Kanji ou Romaji)</label>
              <input
                type="text"
                v-model="form.tituloOriginal"
                class="form-control anivault-input"
                placeholder="Ex: 鬼滅の刃 / Kimetsu no Yaiba"
              />
            </div>

            <!-- URL da Imagem -->
            <div class="mb-3">
              <label class="form-label text-muted small">URL da Imagem / Pôster</label>
              <input
                type="url"
                v-model="form.capaUrl"
                class="form-control anivault-input"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <!-- Status Inicial e Favorito -->
            <div class="row g-2">
              <div class="col-sm-7">
                <label class="form-label text-white fw-semibold small">Status *</label>
                <select v-model="form.status" class="form-select anivault-input">
                  <option value="quero_assistir">🟣 Quero Assistir (Na Fila)</option>
                  <option value="assistindo">🔵 Assistindo (Em Andamento)</option>
                  <option value="assistido">🟢 Assistido (Concluído)</option>
                  <option value="pausado">⚪ Pausado</option>
                </select>
              </div>

              <div class="col-sm-5 d-flex align-items-end">
                <div class="form-check p-2 rounded-2 glass-card border border-secondary border-opacity-25 w-100">
                  <input
                    type="checkbox"
                    v-model="form.favorito"
                    class="form-check-input ms-1"
                    id="checkFavorito"
                  />
                  <label class="form-check-label text-white small ms-2 cursor-pointer" for="checkFavorito">
                    <i class="bi bi-star-fill text-gold me-1"></i> Favorito
                  </label>
                </div>
              </div>
            </div>

          </div>

          <!-- Segunda Linha: Episódios, Nota e Ano -->
          <div class="col-sm-4">
            <label class="form-label text-muted small">Episódios Vistos</label>
            <input
              type="number"
              v-model.number="form.episodiosVistos"
              min="0"
              class="form-control anivault-input"
            />
          </div>

          <div class="col-sm-4">
            <label class="form-label text-muted small">Total de Episódios</label>
            <input
              type="number"
              v-model.number="form.totalEpisodios"
              min="0"
              class="form-control anivault-input"
              placeholder="Vazio p/ contínuo"
            />
          </div>

          <div class="col-sm-4">
            <label class="form-label text-muted small">Nota Pessoal (0 a 10)</label>
            <div class="input-group">
              <span class="input-group-text anivault-input text-gold border-end-0">
                <i class="bi bi-star-fill"></i>
              </span>
              <input
                type="number"
                v-model.number="form.nota"
                min="0"
                max="10"
                step="0.1"
                class="form-control anivault-input border-start-0"
              />
            </div>
          </div>

          <!-- Gêneros e Tags Sugeridas -->
          <div class="col-12">
            <label class="form-label text-muted small">Gêneros (Separados por vírgula)</label>
            <input
              type="text"
              v-model="form.generosTexto"
              class="form-control anivault-input mb-2"
              placeholder="Ex: Ação, Aventura, Fantasia"
            />
            <div class="d-flex align-items-center gap-1 flex-wrap">
              <span class="text-muted small me-1">Tags rápidas:</span>
              <button
                v-for="sugestao in generosSugeridos"
                :key="sugestao"
                type="button"
                class="badge genre-suggestion-btn border-0 py-1 px-2"
                @click="adicionarGeneroRapido(sugestao)"
              >
                + {{ sugestao }}
              </button>
            </div>
          </div>

          <!-- Comentário / Sinopse -->
          <div class="col-12">
            <label class="form-label text-muted small">Anotações / Resenha Pessoal</label>
            <textarea
              v-model="form.comentario"
              rows="2"
              class="form-control anivault-input"
              placeholder="O que você achou desta obra? Suas impressões, teorias ou data de conclusão..."
            ></textarea>
          </div>

        </div>

        <!-- Rodapé com Botões -->
        <div class="d-flex align-items-center justify-content-end gap-2 mt-4 pt-3 border-top border-secondary border-opacity-25">
          <button
            type="button"
            class="btn btn-outline-secondary text-white-50 px-4"
            @click="store.fecharModais()"
          >
            Cancelar
          </button>
          <button type="submit" class="btn btn-anivault-primary px-4">
            <i class="bi bi-check2-circle"></i>
            <span>{{ isEdicao ? 'Salvar Alterações' : 'Adicionar Anime' }}</span>
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(5, 6, 12, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1055;
  overflow-y: auto;
}

.modal-icon-badge {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(124, 58, 237, 0.2);
  border: 1px solid rgba(124, 58, 237, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.cover-preview-box {
  width: 100%;
  max-width: 160px;
  height: 220px;
  background-color: #0b0e1a;
  border: 1px solid var(--av-border-glass);
}

.text-xs {
  font-size: 0.72rem;
}

.text-gold {
  color: var(--av-gold);
}

.text-accent {
  color: var(--av-accent);
}

.genre-suggestion-btn {
  background: rgba(255, 255, 255, 0.05);
  color: var(--av-text-secondary);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.genre-suggestion-btn:hover {
  background: rgba(124, 58, 237, 0.25);
  color: #ffffff;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
