<script setup lang="ts">
import { computed } from 'vue';
import type { Anime } from '../../types/anime';
import { useAnimeStore } from '../../stores/animeStore';

const props = defineProps<{
  anime: Anime;
}>();

const store = useAnimeStore();

const percentualProgresso = computed(() => {
  if (!props.anime.totalEpisodios || props.anime.totalEpisodios === 0) {
    return props.anime.episodiosVistos > 0 ? 100 : 0;
  }
  const pct = Math.round((props.anime.episodiosVistos / props.anime.totalEpisodios) * 100);
  return Math.min(pct, 100);
});

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

const confirmarRemocao = () => {
  if (confirm(`Remover "${props.anime.titulo}" da lista?`)) {
    store.removerAnime(props.anime.id);
  }
};
</script>

<template>
  <div class="glass-card list-item-hover p-2 p-md-3 mb-2 rounded-3 d-flex align-items-center justify-content-between gap-3">
    
    <!-- Esquerda: Mini Capa + Título + Gêneros -->
    <div class="d-flex align-items-center gap-3 flex-grow-1 overflow-hidden">
      <!-- Thumbnail da Capa -->
      <div
        class="thumb-container rounded-2 overflow-hidden flex-shrink-0 cursor-pointer"
        @click="store.abrirModalDetalhes(props.anime)"
      >
        <img
          :src="props.anime.capaUrl"
          :alt="props.anime.titulo"
          class="thumb-img w-100 h-100 object-fit-cover"
          loading="lazy"
          @error="(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/100x140/181c2b/f8fafc?text=Anime')"
        />
      </div>

      <!-- Textos -->
      <div class="overflow-hidden">
        <div class="d-flex align-items-center gap-2">
          <h6
            class="text-white fw-bold mb-0 text-truncate cursor-pointer hover-accent"
            @click="store.abrirModalDetalhes(props.anime)"
          >
            {{ props.anime.titulo }}
          </h6>
          <span v-if="props.anime.anoLancamento" class="badge bg-dark text-muted small d-none d-sm-inline">
            {{ props.anime.anoLancamento }}
          </span>
        </div>
        
        <p v-if="props.anime.tituloOriginal" class="text-muted small mb-1 text-truncate fst-italic">
          {{ props.anime.tituloOriginal }}
        </p>

        <!-- Tags de Gêneros -->
        <div class="d-flex gap-1 flex-wrap">
          <span v-for="genero in props.anime.generos.slice(0, 3)" :key="genero" class="badge genre-badge-sm">
            {{ genero }}
          </span>
        </div>
      </div>
    </div>

    <!-- Centro: Progresso de Episódios -->
    <div class="d-none d-md-block flex-shrink-0" style="width: 170px;">
      <div class="d-flex align-items-center justify-content-between small mb-1">
        <span class="text-muted small">
          Ep: <strong class="text-white">{{ props.anime.episodiosVistos }}</strong> / {{ props.anime.totalEpisodios ?? '?' }}
        </span>
        <button
          class="btn btn-sm btn-quick-ep py-0 px-2"
          @click="store.incrementarEpisodio(props.anime.id)"
          title="Avançar 1 ep"
        >
          +1 Ep
        </button>
      </div>
      <div class="progress progress-dark" style="height: 5px;">
        <div
          class="progress-bar"
          :class="{
            'bg-success': props.anime.status === 'assistido',
            'bg-info': props.anime.status === 'assistindo',
            'bg-purple': props.anime.status === 'quero_assistir'
          }"
          :style="{ width: percentualProgresso + '%' }"
        ></div>
      </div>
    </div>

    <!-- Centro-Direita: Nota e Favorito -->
    <div class="d-flex align-items-center gap-3 flex-shrink-0">
      <div class="d-flex align-items-center gap-1 text-gold fw-bold small">
        <i class="bi bi-star-fill"></i>
        <span>{{ props.anime.nota ? props.anime.nota.toFixed(1) : '-' }}</span>
      </div>

      <button
        class="btn btn-fav-icon p-1"
        :class="{ active: props.anime.favorito }"
        @click="store.alternarFavorito(props.anime.id)"
        title="Favoritar"
      >
        <i class="bi" :class="props.anime.favorito ? 'bi-heart-fill text-danger' : 'bi-heart text-muted'"></i>
      </button>

      <!-- Seletor de Status -->
      <div class="dropdown">
        <button
          class="badge py-2 px-3 border-0 rounded-pill d-flex align-items-center gap-1 dropdown-toggle cursor-pointer"
          :class="statusBadgeClass"
          type="button"
          data-bs-toggle="dropdown"
        >
          <span>{{ statusLabel }}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark shadow border-secondary border-opacity-50">
          <li>
            <button class="dropdown-item py-2" @click="store.alterarStatus(props.anime.id, 'assistindo')">
              <i class="bi bi-play-circle-fill text-info me-1"></i> Assistindo
            </button>
          </li>
          <li>
            <button class="dropdown-item py-2" @click="store.alterarStatus(props.anime.id, 'assistido')">
              <i class="bi bi-check-circle-fill text-success me-1"></i> Assistido
            </button>
          </li>
          <li>
            <button class="dropdown-item py-2" @click="store.alterarStatus(props.anime.id, 'quero_assistir')">
              <i class="bi bi-bookmark-heart-fill text-purple me-1"></i> Quero Assistir
            </button>
          </li>
        </ul>
      </div>

      <!-- Menu de Ações Rápidas -->
      <div class="dropdown">
        <button class="btn btn-sm text-muted p-1 border-0" data-bs-toggle="dropdown">
          <i class="bi bi-three-dots-vertical"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow border-secondary border-opacity-50">
          <li>
            <button class="dropdown-item" @click="store.abrirModalDetalhes(props.anime)">
              <i class="bi bi-eye text-info me-2"></i> Ver Detalhes
            </button>
          </li>
          <li>
            <button class="dropdown-item" @click="store.abrirModalEdicao(props.anime)">
              <i class="bi bi-pencil-square text-primary me-2"></i> Editar
            </button>
          </li>
          <li>
            <button class="dropdown-item text-danger" @click="confirmarRemocao">
              <i class="bi bi-trash3 me-2"></i> Remover
            </button>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<style scoped>
.thumb-container {
  width: 52px;
  height: 68px;
  background-color: #0d111d;
}

.genre-badge-sm {
  background: rgba(255, 255, 255, 0.06);
  color: var(--av-text-muted);
  font-size: 0.65rem;
  font-weight: 500;
  border-radius: 4px;
}

.hover-accent:hover {
  color: var(--av-accent) !important;
}

.text-gold {
  color: var(--av-gold);
}

.btn-fav-icon {
  background: transparent;
  border: none;
  font-size: 1.1rem;
}

.btn-fav-icon:hover {
  transform: scale(1.15);
}

.btn-quick-ep {
  background: rgba(0, 245, 212, 0.12);
  color: var(--av-accent);
  border: 1px solid rgba(0, 245, 212, 0.3);
  font-weight: 600;
  font-size: 0.7rem;
  border-radius: 6px;
}

.btn-quick-ep:hover {
  background: var(--av-accent);
  color: #07080d;
}

.bg-purple {
  background-color: var(--av-status-planned) !important;
}

.text-purple {
  color: var(--av-status-planned) !important;
}

.progress-dark {
  background: rgba(255, 255, 255, 0.08);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
