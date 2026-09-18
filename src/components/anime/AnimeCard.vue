<script setup lang="ts">
import { computed } from 'vue';
import type { Anime, AnimeStatus } from '../../types/anime';
import { useAnimeStore } from '../../stores/animeStore';

const props = defineProps<{
  anime: Anime;
}>();

const store = useAnimeStore();

// Cálculo da porcentagem de progresso de episódios
const percentualProgresso = computed(() => {
  if (!props.anime.totalEpisodios || props.anime.totalEpisodios === 0) {
    return props.anime.episodiosVistos > 0 ? 100 : 0;
  }
  const pct = Math.round((props.anime.episodiosVistos / props.anime.totalEpisodios) * 100);
  return Math.min(pct, 100);
});

// Textos e classes para os status
const statusLabel = computed(() => {
  switch (props.anime.status) {
    case 'assistindo':
      return 'Assistindo';
    case 'assistido':
      return 'Assistido';
    case 'quero_assistir':
      return 'Quero Assistir';
    case 'pausado':
      return 'Pausado';
    default:
      return props.anime.status;
  }
});

const statusBadgeClass = computed(() => {
  return `badge-status-${props.anime.status}`;
});

const statusIcon = computed(() => {
  switch (props.anime.status) {
    case 'assistindo':
      return 'bi-play-circle-fill';
    case 'assistido':
      return 'bi-check-circle-fill';
    case 'quero_assistir':
      return 'bi-bookmark-heart-fill';
    case 'pausado':
      return 'bi-pause-circle-fill';
    default:
      return 'bi-circle';
  }
});

const confirmarRemocao = () => {
  if (confirm(`Deseja realmente remover "${props.anime.titulo}" da sua coleção?`)) {
    store.removerAnime(props.anime.id);
  }
};
</script>

<template>
  <div class="glass-card anime-card h-100 d-flex flex-column overflow-hidden position-relative">
    
    <!-- Imagem de Capa do Pôster -->
    <div class="poster-container position-relative overflow-hidden cursor-pointer" @click="store.abrirModalDetalhes(props.anime)">
      <img
        :src="props.anime.capaUrl"
        :alt="props.anime.titulo"
        class="poster-img w-100 object-fit-cover"
        loading="lazy"
        @error="(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/400x600/181c2b/f8fafc?text=Sem+Capa')"
      />

      <!-- Overlay Gradiente na Capa -->
      <div class="poster-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between p-3">
        <!-- Topo da Capa: Nota e Botão Favorito -->
        <div class="d-flex align-items-center justify-content-between w-100">
          <span class="badge rating-badge d-flex align-items-center gap-1 shadow-sm">
            <i class="bi bi-star-fill text-gold"></i>
            <span class="fw-bold">{{ props.anime.nota ? props.anime.nota.toFixed(1) : '-' }}</span>
          </span>

          <button
            class="btn btn-fav-heart p-0 d-flex align-items-center justify-content-center shadow"
            :class="{ active: props.anime.favorito }"
            @click.stop="store.alternarFavorito(props.anime.id)"
            title="Favoritar Anime"
          >
            <i class="bi" :class="props.anime.favorito ? 'bi-heart-fill text-danger' : 'bi-heart text-white'"></i>
          </button>
        </div>

        <!-- Centro da Capa: Ícone Hover de Detalhes -->
        <div class="hover-play-icon text-center">
          <div class="play-btn-circle d-inline-flex align-items-center justify-content-center">
            <i class="bi bi-eye-fill fs-4 text-white"></i>
          </div>
          <div class="small fw-semibold text-white mt-1 text-shadow">Ver Detalhes</div>
        </div>

        <!-- Fundo da Capa: Ano e Tags Rápidas -->
        <div class="d-flex align-items-center gap-1 flex-wrap">
          <span v-if="props.anime.anoLancamento" class="badge year-badge">
            {{ props.anime.anoLancamento }}
          </span>
          <span v-if="props.anime.generos[0]" class="badge genre-badge">
            {{ props.anime.generos[0] }}
          </span>
        </div>
      </div>
    </div>

    <!-- Corpo do Card -->
    <div class="card-body p-3 d-flex flex-column flex-grow-1 justify-content-between">
      
      <!-- Título e Subtítulo -->
      <div>
        <h6
          class="fw-bold text-white mb-1 anime-title cursor-pointer text-truncate"
          :title="props.anime.titulo"
          @click="store.abrirModalDetalhes(props.anime)"
        >
          {{ props.anime.titulo }}
        </h6>
        <p v-if="props.anime.tituloOriginal" class="text-muted small text-truncate mb-2 fst-italic">
          {{ props.anime.tituloOriginal }}
        </p>
      </div>

      <!-- Barra de Progresso de Episódios -->
      <div class="my-2">
        <div class="d-flex align-items-center justify-content-between small mb-1">
          <span class="text-muted">
            Episódios:
            <strong class="text-white">{{ props.anime.episodiosVistos }}</strong>
            <span class="text-white-50">/ {{ props.anime.totalEpisodios ?? '?' }}</span>
          </span>
          <span class="text-accent fw-bold small">{{ percentualProgresso }}%</span>
        </div>
        
        <div class="progress progress-dark" style="height: 6px;">
          <div
            class="progress-bar"
            :class="{
              'bg-success': props.anime.status === 'assistido',
              'bg-info': props.anime.status === 'assistindo',
              'bg-purple': props.anime.status === 'quero_assistir'
            }"
            role="progressbar"
            :style="{ width: percentualProgresso + '%' }"
            :aria-valuenow="percentualProgresso"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      <!-- Rodapé do Card: Seletor Rápido de Status e Ações -->
      <div class="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-25 gap-1">
        
        <!-- Dropdown Seletor de Status Direto -->
        <div class="dropdown">
          <button
            class="badge py-2 px-2 border-0 rounded-pill d-flex align-items-center gap-1 dropdown-toggle cursor-pointer status-toggle-btn"
            :class="statusBadgeClass"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title="Clique para alternar o status deste anime"
          >
            <i class="bi" :class="statusIcon"></i>
            <span>{{ statusLabel }}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-dark shadow-lg border-secondary border-opacity-50 py-1">
            <li>
              <button
                class="dropdown-item d-flex align-items-center gap-2 py-2"
                :class="{ active: props.anime.status === 'assistindo' }"
                @click="store.alterarStatus(props.anime.id, 'assistindo')"
              >
                <i class="bi bi-play-circle-fill text-info"></i>
                <span>Assistindo</span>
              </button>
            </li>
            <li>
              <button
                class="dropdown-item d-flex align-items-center gap-2 py-2"
                :class="{ active: props.anime.status === 'assistido' }"
                @click="store.alterarStatus(props.anime.id, 'assistido')"
              >
                <i class="bi bi-check-circle-fill text-success"></i>
                <span>Assistido</span>
              </button>
            </li>
            <li>
              <button
                class="dropdown-item d-flex align-items-center gap-2 py-2"
                :class="{ active: props.anime.status === 'quero_assistir' }"
                @click="store.alterarStatus(props.anime.id, 'quero_assistir')"
              >
                <i class="bi bi-bookmark-heart-fill text-purple"></i>
                <span>Quero Assistir</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Botões de Ação (+1 Ep, Editar, Excluir) -->
        <div class="d-flex align-items-center gap-1">
          <!-- Botão Rápido +1 Episódio -->
          <button
            class="btn btn-sm btn-quick-ep d-flex align-items-center justify-content-center"
            @click="store.incrementarEpisodio(props.anime.id)"
            title="Avançar 1 Episódio"
          >
            <i class="bi bi-plus"></i>1
          </button>

          <!-- Menu de mais opções (Editar / Excluir) -->
          <div class="dropdown">
            <button
              class="btn btn-sm btn-icon-more text-muted p-1"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow border-secondary border-opacity-50">
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2" @click="store.abrirModalEdicao(props.anime)">
                  <i class="bi bi-pencil-square text-primary"></i>
                  <span>Editar Anime</span>
                </button>
              </li>
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2 text-danger" @click="confirmarRemocao">
                  <i class="bi bi-trash3-fill"></i>
                  <span>Remover</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.anime-card {
  border-radius: var(--av-radius-md);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.poster-container {
  height: 280px;
  background-color: #0d111d;
}

.poster-img {
  height: 100%;
  transition: transform 0.4s ease;
}

.anime-card:hover .poster-img {
  transform: scale(1.06);
}

.poster-overlay {
  background: linear-gradient(180deg, rgba(7, 8, 13, 0.6) 0%, rgba(7, 8, 13, 0.1) 40%, rgba(7, 8, 13, 0.95) 100%);
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.hover-play-icon {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.poster-container:hover .hover-play-icon {
  opacity: 1;
  transform: translateY(0);
}

.play-btn-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.85);
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.6);
}

.rating-badge {
  background: rgba(14, 18, 32, 0.85);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 8px;
}

.text-gold {
  color: var(--av-gold);
}

.btn-fav-heart {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(14, 18, 32, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.2s ease;
}

.btn-fav-heart:hover, .btn-fav-heart.active {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  transform: scale(1.1);
}

.year-badge, .genre-badge {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  font-size: 0.7rem;
  padding: 3px 6px;
  border-radius: 6px;
}

.anime-title {
  font-size: 1rem;
  transition: color 0.2s ease;
}

.anime-title:hover {
  color: var(--av-accent) !important;
}

.progress-dark {
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.bg-purple {
  background-color: var(--av-status-planned) !important;
}

.text-purple {
  color: var(--av-status-planned) !important;
}

.text-accent {
  color: var(--av-accent) !important;
}

.btn-quick-ep {
  background: rgba(0, 245, 212, 0.12);
  color: var(--av-accent);
  border: 1px solid rgba(0, 245, 212, 0.3);
  font-weight: 700;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.btn-quick-ep:hover {
  background: var(--av-accent);
  color: #07080d;
  box-shadow: 0 0 10px rgba(0, 245, 212, 0.4);
}

.btn-icon-more {
  border-radius: 6px;
  background: transparent;
  border: none;
}

.btn-icon-more:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff !important;
}

.status-toggle-btn {
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.status-toggle-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
