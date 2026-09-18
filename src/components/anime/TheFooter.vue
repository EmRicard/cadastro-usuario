<script setup lang="ts">
import { useAnimeStore } from '../../stores/animeStore';

const store = useAnimeStore();
</script>

<template>
  <footer class="glass-panel border-top border-secondary border-opacity-25 mt-5 py-4">
    <div class="container-fluid max-w-7xl px-3 px-md-4">
      <div class="row align-items-center gy-3">
        
        <!-- Logo e Copyright -->
        <div class="col-md-6 text-center text-md-start">
          <div class="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
            <span class="fw-bold font-display fs-5 text-white">ANI<span class="text-accent">VAULT</span></span>
            <span class="text-muted small">| アニ記録</span>
          </div>
          <p class="text-muted small mb-0">
            Sua jornada otaku, eternizada no seu universo. Dados salvos com segurança no seu navegador.
          </p>
        </div>

        <!-- Estatísticas Resumidas e Atalhos -->
        <div class="col-md-6 text-center text-md-end">
          <div class="d-inline-flex align-items-center gap-3 text-muted small">
            <span><strong>{{ store.totalAnimes }}</strong> Animes no Catálogo</span>
            <span>•</span>
            <span><strong>{{ store.totalEpisodiosVistos }}</strong> Episódios Concluídos</span>
            <span>•</span>
            <button class="btn btn-link text-accent p-0 text-decoration-none small" @click="store.exportarBackup()">
              Baixar Backup
            </button>
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

<style scoped>
.max-w-7xl {
  max-width: 1400px;
}
.text-accent {
  color: var(--av-accent);
}
</style>
