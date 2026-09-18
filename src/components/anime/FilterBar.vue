<script setup lang="ts">
import { useAnimeStore } from '../../stores/animeStore';
import type { AnimeStatus, SortOption } from '../../types/anime';

const store = useAnimeStore();

const statusTabs: { id: AnimeStatus | 'todos' | 'favoritos'; label: string; icon: string; count: () => number }[] = [
  { id: 'todos', label: 'Todos', icon: 'bi-collection-fill', count: () => store.totalAnimes },
  { id: 'assistindo', label: 'Assistindo', icon: 'bi-play-circle-fill', count: () => store.totalAssistindo },
  { id: 'assistido', label: 'Assistidos', icon: 'bi-check-circle-fill', count: () => store.totalAssistidos },
  { id: 'quero_assistir', label: 'Quero Assistir', icon: 'bi-bookmark-heart-fill', count: () => store.totalQueroAssistir },
  { id: 'favoritos', label: 'Favoritos', icon: 'bi-star-fill', count: () => store.totalFavoritos },
];
</script>

<template>
  <div class="filter-bar-container mb-4">
    <div class="glass-panel rounded-3 p-3">
      <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
        
        <!-- Abas de Status com Pílulas e Contadores -->
        <div class="d-flex align-items-center gap-2 overflow-x-auto pb-2 pb-lg-0 status-tabs-scroll">
          <button
            v-for="tab in statusTabs"
            :key="tab.id"
            class="btn filter-pill-btn d-flex align-items-center gap-2 py-2 px-3 text-nowrap"
            :class="{ 'filter-pill-active': store.filtroStatus === tab.id }"
            @click="store.filtroStatus = tab.id"
          >
            <i :class="tab.icon" class="filter-icon"></i>
            <span>{{ tab.label }}</span>
            <span class="badge filter-count-badge">{{ tab.count() }}</span>
          </button>
        </div>

        <!-- Seção de Controles Secundários: Gênero, Ordenação e Modo de Visualização -->
        <div class="d-flex align-items-center gap-2 flex-wrap flex-sm-nowrap">
          
          <!-- Filtro por Gênero -->
          <div class="select-wrapper">
            <select
              v-model="store.filtroGenero"
              class="form-select form-select-sm anivault-input py-2 px-3 cursor-pointer"
              aria-label="Filtrar por Gênero"
            >
              <option value="todos">Todos os Gêneros</option>
              <option v-for="genero in store.todosGeneros" :key="genero" :value="genero">
                {{ genero }}
              </option>
            </select>
          </div>

          <!-- Ordenação -->
          <div class="select-wrapper">
            <select
              v-model="store.ordenacao"
              class="form-select form-select-sm anivault-input py-2 px-3 cursor-pointer"
              aria-label="Ordenar Animes"
            >
              <option value="nota_desc">★ Maior Nota</option>
              <option value="nota_asc">★ Menor Nota</option>
              <option value="titulo_asc">A-Z Alfabético</option>
              <option value="titulo_desc">Z-A Alfabético</option>
              <option value="recentes">Mais Recentes</option>
              <option value="progresso_desc">Mais Episódios</option>
            </select>
          </div>

          <!-- Alternador de Visualização (Grade / Lista) -->
          <div class="btn-group btn-group-sm" role="group" aria-label="Modo de Exibição">
            <button
              type="button"
              class="btn view-toggle-btn py-2 px-3"
              :class="{ active: store.modoVisualizacao === 'grid' }"
              @click="store.modoVisualizacao = 'grid'"
              title="Visualização em Grade"
            >
              <i class="bi bi-grid-3x3-gap-fill"></i>
            </button>
            <button
              type="button"
              class="btn view-toggle-btn py-2 px-3"
              :class="{ active: store.modoVisualizacao === 'list' }"
              @click="store.modoVisualizacao = 'list'"
              title="Visualização em Lista"
            >
              <i class="bi bi-list-ul"></i>
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-pill-btn {
  background: rgba(255, 255, 255, 0.04);
  color: var(--av-text-secondary);
  border: 1px solid var(--av-border-glass);
  border-radius: 20px;
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-pill-btn:hover {
  background: rgba(124, 58, 237, 0.15);
  border-color: rgba(124, 58, 237, 0.4);
  color: #ffffff;
}

.filter-pill-active {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.8) 0%, rgba(109, 40, 217, 0.9) 100%) !important;
  color: #ffffff !important;
  border-color: var(--av-primary) !important;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
}

.filter-icon {
  font-size: 0.85rem;
  opacity: 0.9;
}

.filter-count-badge {
  background: rgba(0, 0, 0, 0.35);
  color: #ffffff;
  font-size: 0.72rem;
  padding: 3px 7px;
  border-radius: 12px;
}

.filter-pill-active .filter-count-badge {
  background: rgba(0, 245, 212, 0.3);
  color: #ffffff;
}

.status-tabs-scroll::-webkit-scrollbar {
  height: 4px;
}

.select-wrapper select {
  min-width: 155px;
  background-position: right 0.75rem center;
}

.view-toggle-btn {
  background: rgba(255, 255, 255, 0.04);
  color: var(--av-text-muted);
  border: 1px solid var(--av-border-glass);
  transition: all 0.2s ease;
}

.view-toggle-btn:hover, .view-toggle-btn.active {
  background: var(--av-primary);
  color: #ffffff;
  border-color: var(--av-primary);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
