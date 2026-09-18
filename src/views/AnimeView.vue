<script setup lang="ts">
import { useAnimeStore } from '../stores/animeStore';
import HeroStats from '../components/anime/HeroStats.vue';
import FilterBar from '../components/anime/FilterBar.vue';
import AnimeCard from '../components/anime/AnimeCard.vue';
import AnimeListItem from '../components/anime/AnimeListItem.vue';
import EmptyState from '../components/anime/EmptyState.vue';
import AnimeModalForm from '../components/anime/AnimeModalForm.vue';
import AnimeDetailModal from '../components/anime/AnimeDetailModal.vue';

const store = useAnimeStore();
</script>

<template>
  <main class="container-fluid max-w-7xl py-3 px-3 px-md-4">
    
    <!-- Painel Hero com Estatísticas Gamificadas -->
    <HeroStats />

    <!-- Barra de Filtros e Visualização -->
    <FilterBar />

    <!-- Área Principal de Exibição dos Animes -->
    <section aria-label="Catálogo de Animes">
      
      <!-- Estado Vazio (Sem resultados) -->
      <EmptyState v-if="store.animesFiltrados.length === 0" />

      <!-- Modo de Exibição 1: Grade de Pôsteres (Grid) -->
      <div
        v-else-if="store.modoVisualizacao === 'grid'"
        class="row g-3 g-md-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
      >
        <div v-for="anime in store.animesFiltrados" :key="anime.id" class="col">
          <AnimeCard :anime="anime" />
        </div>
      </div>

      <!-- Modo de Exibição 2: Lista Compacta (List) -->
      <div v-else class="anime-list-wrapper">
        <AnimeListItem v-for="anime in store.animesFiltrados" :key="anime.id" :anime="anime" />
      </div>

    </section>

    <!-- Botão de Ação Flutuante (FAB) para Mobile -->
    <button
      class="btn btn-fab-mobile d-md-none shadow-lg d-flex align-items-center justify-content-center"
      @click="store.abrirModalCadastro()"
      title="Adicionar Anime"
    >
      <i class="bi bi-plus-lg fs-3 text-white"></i>
    </button>

    <!-- Modais de Criação/Edição e Detalhes -->
    <AnimeModalForm />
    <AnimeDetailModal />

  </main>
</template>

<style scoped>
.max-w-7xl {
  max-width: 1400px;
}

.btn-fab-mobile {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--av-primary) 0%, #00f5d4 100%);
  border: none;
  z-index: 99;
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.6);
  transition: transform 0.2s ease;
}

.btn-fab-mobile:active {
  transform: scale(0.92);
}
</style>
