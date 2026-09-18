<script setup lang="ts">
import { useAnimeStore } from '../../stores/animeStore';

const store = useAnimeStore();

const resetarFiltros = () => {
  store.buscaTexto = '';
  store.filtroStatus = 'todos';
  store.filtroGenero = 'todos';
};
</script>

<template>
  <div class="glass-panel text-center py-5 px-4 my-5 rounded-4 empty-state-box">
    <!-- Ícone Temático Central -->
    <div class="empty-icon-circle mx-auto mb-3 d-flex align-items-center justify-content-center">
      <i class="bi bi-compass fs-1 text-accent"></i>
    </div>

    <h4 class="fw-bold text-white font-display mb-2">Nenhum anime encontrado</h4>
    <p class="text-muted mx-auto mb-4" style="max-width: 460px;">
      Não encontramos nenhuma obra com os filtros selecionados ou no termo pesquisado. Experimente ajustar sua busca ou adicione um novo anime à sua jornada!
    </p>

    <div class="d-flex align-items-center justify-content-center gap-2 flex-wrap">
      <button
        v-if="store.buscaTexto || store.filtroStatus !== 'todos' || store.filtroGenero !== 'todos'"
        class="btn btn-anivault-outline px-4 py-2"
        @click="resetarFiltros"
      >
        <i class="bi bi-arrow-clockwise me-1"></i> Limpar Filtros
      </button>

      <button
        class="btn btn-anivault-primary px-4 py-2"
        @click="store.abrirModalCadastro()"
      >
        <i class="bi bi-plus-circle me-1"></i> Adicionar Anime
      </button>
    </div>
  </div>
</template>

<style scoped>
.empty-state-box {
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

.empty-icon-circle {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: rgba(0, 245, 212, 0.08);
  border: 1px solid rgba(0, 245, 212, 0.25);
  box-shadow: 0 0 20px rgba(0, 245, 212, 0.15);
}

.text-accent {
  color: var(--av-accent);
}
</style>
