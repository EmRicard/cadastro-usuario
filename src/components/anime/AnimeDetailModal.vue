<script setup lang="ts">
import { computed } from 'vue';
import { useAnimeStore } from '../../stores/animeStore';

const store = useAnimeStore();

const anime = computed(() => store.animeEmDetalhes);

const percentualProgresso = computed(() => {
  if (!anime.value) return 0;
  if (!anime.value.totalEpisodios || anime.value.totalEpisodios === 0) {
    return anime.value.episodiosVistos > 0 ? 100 : 0;
  }
  const pct = Math.round((anime.value.episodiosVistos / anime.value.totalEpisodios) * 100);
  return Math.min(pct, 100);
});

const statusLabel = computed(() => {
  if (!anime.value) return '';
  switch (anime.value.status) {
    case 'assistindo':
      return 'Assistindo';
    case 'assistido':
      return 'Assistido';
    case 'quero_assistir':
      return 'Quero Assistir';
    case 'pausado':
      return 'Pausado';
    default:
      return anime.value.status;
  }
});

const statusBadgeClass = computed(() => {
  return anime.value ? `badge-status-${anime.value.status}` : '';
});

const editarAtual = () => {
  if (anime.value) {
    store.abrirModalEdicao(anime.value);
  }
};

const removerAtual = () => {
  if (anime.value && confirm(`Deseja realmente excluir "${anime.value.titulo}"?`)) {
    store.removerAnime(anime.value.id);
    store.fecharModais();
  }
};
</script>

<template>
  <div
    v-if="store.isDetailModalOpen && anime"
    class="modal-backdrop-custom d-flex align-items-center justify-content-center p-3"
    @click.self="store.fecharModais()"
  >
    <div class="glass-panel anivault-modal-content w-100 p-0 overflow-hidden shadow-2xl position-relative" style="max-width: 740px;">
      
      <!-- Backdrop Banner com Gradiente e Capa Desfocada -->
      <div class="modal-backdrop-banner position-relative overflow-hidden">
        <img
          :src="anime.capaUrl"
          alt="Backdrop"
          class="backdrop-blurred-img position-absolute w-100 h-100 object-fit-cover"
        />
        <div class="backdrop-gradient-overlay position-absolute w-100 h-100"></div>

        <!-- Botão Fechar no Topo -->
        <button
          type="button"
          class="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3 shadow"
          @click="store.fecharModais()"
        ></button>
      </div>

      <!-- Conteúdo com Pôster Sobreposto -->
      <div class="p-4 pt-0 position-relative z-2">
        <div class="row g-4">
          
          <!-- Pôster Flutuante -->
          <div class="col-sm-4 text-center text-sm-start" style="margin-top: -60px;">
            <div class="detail-poster-box rounded-3 overflow-hidden shadow-lg mx-auto mx-sm-0">
              <img
                :src="anime.capaUrl"
                :alt="anime.titulo"
                class="w-100 h-100 object-fit-cover"
                @error="(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/400x600/181c2b/f8fafc?text=Sem+Capa')"
              />
            </div>

            <!-- Botão de Favoritar Rápido -->
            <button
              class="btn btn-outline-secondary w-100 mt-3 d-flex align-items-center justify-content-center gap-2 border-secondary border-opacity-50 text-white"
              :class="{ 'border-danger text-danger': anime.favorito }"
              @click="store.alternarFavorito(anime.id)"
            >
              <i class="bi" :class="anime.favorito ? 'bi-heart-fill text-danger' : 'bi-heart'"></i>
              <span>{{ anime.favorito ? 'Favoritado' : 'Adicionar aos Favoritos' }}</span>
            </button>
          </div>

          <!-- Informações e Metadados -->
          <div class="col-sm-8">
            <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
              <span class="badge py-1 px-3 rounded-pill" :class="statusBadgeClass">
                {{ statusLabel }}
              </span>
              <span v-if="anime.anoLancamento" class="badge bg-dark border border-secondary border-opacity-50 text-muted">
                {{ anime.anoLancamento }}
              </span>
              <span class="badge d-flex align-items-center gap-1 text-gold bg-dark border border-warning border-opacity-25 ms-auto">
                <i class="bi bi-star-fill"></i>
                <span class="fw-bold">{{ anime.nota ? anime.nota.toFixed(1) : '-' }} / 10</span>
              </span>
            </div>

            <h3 class="fw-bold text-white font-display mb-1">{{ anime.titulo }}</h3>
            <p v-if="anime.tituloOriginal" class="text-muted fst-italic mb-3">
              {{ anime.tituloOriginal }}
            </p>

            <!-- Gêneros -->
            <div class="d-flex align-items-center gap-1 flex-wrap mb-3">
              <span v-for="g in anime.generos" :key="g" class="badge genre-tag">
                {{ g }}
              </span>
            </div>

            <!-- Controle de Progresso Interativo -->
            <div class="glass-card p-3 rounded-3 mb-3 border border-secondary border-opacity-25">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="text-white small fw-semibold">Progresso da Série</span>
                <div class="d-flex align-items-center gap-2">
                  <button
                    class="btn btn-sm btn-outline-secondary py-0 px-2 text-white"
                    @click="store.decrementarEpisodio(anime.id)"
                    :disabled="anime.episodiosVistos <= 0"
                    title="Diminuir 1 ep"
                  >
                    -1
                  </button>
                  <span class="fw-bold text-white">
                    {{ anime.episodiosVistos }} / {{ anime.totalEpisodios ?? '?' }} eps
                  </span>
                  <button
                    class="btn btn-sm btn-anivault-primary py-0 px-2"
                    @click="store.incrementarEpisodio(anime.id)"
                    title="Avançar 1 ep"
                  >
                    +1
                  </button>
                </div>
              </div>

              <div class="progress progress-dark" style="height: 8px;">
                <div
                  class="progress-bar"
                  :class="{
                    'bg-success': anime.status === 'assistido',
                    'bg-info': anime.status === 'assistindo',
                    'bg-purple': anime.status === 'quero_assistir'
                  }"
                  :style="{ width: percentualProgresso + '%' }"
                ></div>
              </div>
            </div>

            <!-- Sinopse -->
            <div v-if="anime.sinopse" class="mb-3">
              <h6 class="text-uppercase small fw-bold text-accent mb-1 tracking-wider">Sinopse</h6>
              <p class="text-secondary small mb-0 lh-base">{{ anime.sinopse }}</p>
            </div>

            <!-- Resenha Pessoal -->
            <div v-if="anime.comentario" class="p-3 rounded-3 review-box mb-3">
              <h6 class="small fw-bold text-white mb-1 d-flex align-items-center gap-1">
                <i class="bi bi-chat-quote-fill text-gold"></i>
                <span>Minha Avaliação / Notas</span>
              </h6>
              <p class="text-white-50 small mb-0 fst-italic">
                "{{ anime.comentario }}"
              </p>
            </div>

          </div>

        </div>

        <!-- Ações Inferiores -->
        <div class="d-flex align-items-center justify-content-between pt-3 mt-3 border-top border-secondary border-opacity-25">
          <button class="btn btn-outline-danger btn-sm px-3" @click="removerAtual">
            <i class="bi bi-trash3 me-1"></i> Excluir da Lista
          </button>

          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-anivault-outline btn-sm px-3" @click="editarAtual">
              <i class="bi bi-pencil me-1"></i> Editar Dados
            </button>
            <button class="btn btn-secondary btn-sm px-4" @click="store.fecharModais()">
              Fechar
            </button>
          </div>
        </div>

      </div>

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
  background-color: rgba(5, 6, 12, 0.88);
  backdrop-filter: blur(8px);
  z-index: 1055;
  overflow-y: auto;
}

.modal-backdrop-banner {
  height: 130px;
}

.backdrop-blurred-img {
  filter: blur(25px) brightness(0.4);
  transform: scale(1.1);
}

.backdrop-gradient-overlay {
  background: linear-gradient(180deg, rgba(15, 19, 34, 0.2) 0%, rgba(15, 19, 34, 1) 100%);
}

.detail-poster-box {
  width: 170px;
  height: 250px;
  border: 2px solid rgba(255, 255, 255, 0.15);
  background-color: #0b0e1a;
}

.text-gold {
  color: var(--av-gold);
}

.text-accent {
  color: var(--av-accent);
}

.genre-tag {
  background: rgba(124, 58, 237, 0.18);
  color: #ddd6fe;
  border: 1px solid rgba(124, 58, 237, 0.35);
  font-size: 0.75rem;
  border-radius: 6px;
  padding: 4px 8px;
}

.review-box {
  background: rgba(245, 158, 11, 0.06);
  border: 1px solid rgba(245, 158, 11, 0.2);
}

.progress-dark {
  background: rgba(255, 255, 255, 0.08);
}

.bg-purple {
  background-color: var(--av-status-planned) !important;
}
</style>
