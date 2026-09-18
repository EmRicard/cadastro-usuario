<script setup lang="ts">
import { useAnimeStore } from '../../stores/animeStore';
import type { AnimeStatus } from '../../types/anime';

const store = useAnimeStore();

const definirFiltroStatus = (status: AnimeStatus | 'todos' | 'favoritos') => {
  store.filtroStatus = status;
};
</script>

<template>
  <div class="hero-stats-wrapper my-4">
    <div class="glass-panel rounded-4 p-4 position-relative overflow-hidden">
      <!-- Elemento de Fundo Decorativo -->
      <div class="glow-orb glow-orb-purple"></div>
      <div class="glow-orb glow-orb-cyan"></div>

      <div class="row align-items-center mb-4">
        <div class="col-lg-8">
          <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 status-pill-badge">
            <span class="pulse-dot"></span>
            <span class="small fw-semibold text-accent">Painel de Acompanhamento em Tempo Real</span>
          </div>
          <h1 class="display-6 fw-black font-display text-white mb-1">
            Minha Coleção <span class="text-gradient-purple-cyan">AniVault</span>
          </h1>
          <p class="text-muted mb-0">
            Acompanhe seu progresso, organize sua fila e descubra quantos mundos você já explorou.
          </p>
        </div>

        <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
          <div class="d-inline-block text-start p-3 rounded-3 glass-card border border-secondary border-opacity-25">
            <div class="d-flex align-items-center gap-3">
              <div class="stat-icon-total d-flex align-items-center justify-content-center">
                <i class="bi bi-collection-play-fill fs-4 text-accent"></i>
              </div>
              <div>
                <div class="fs-4 fw-bold text-white font-display">{{ store.totalEpisodiosVistos }}</div>
                <div class="text-muted small text-uppercase tracking-wider">Episódios Vistos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid de Cartões de Métricas Clicáveis -->
      <div class="row g-3">
        <!-- Card 1: Assistidos -->
        <div class="col-6 col-md-3">
          <div
            class="stat-card p-3 rounded-3 cursor-pointer transition-all"
            :class="{ 'stat-card-active active-completed': store.filtroStatus === 'assistido' }"
            @click="definirFiltroStatus('assistido')"
            role="button"
            title="Clique para filtrar apenas animes assistidos"
          >
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-muted small fw-semibold text-uppercase">Assistidos</span>
              <div class="stat-badge stat-badge-green">
                <i class="bi bi-check-circle-fill"></i>
              </div>
            </div>
            <div class="fs-2 fw-black text-white font-display">{{ store.totalAssistidos }}</div>
            <div class="stat-indicator mt-1">
              <span class="indicator-bar bg-success" style="width: 100%;"></span>
            </div>
          </div>
        </div>

        <!-- Card 2: Assistindo -->
        <div class="col-6 col-md-3">
          <div
            class="stat-card p-3 rounded-3 cursor-pointer transition-all"
            :class="{ 'stat-card-active active-watching': store.filtroStatus === 'assistindo' }"
            @click="definirFiltroStatus('assistindo')"
            role="button"
            title="Clique para filtrar apenas animes que você está assistindo"
          >
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-muted small fw-semibold text-uppercase">Assistindo</span>
              <div class="stat-badge stat-badge-cyan">
                <i class="bi bi-play-circle-fill"></i>
              </div>
            </div>
            <div class="fs-2 fw-black text-white font-display">{{ store.totalAssistindo }}</div>
            <div class="stat-indicator mt-1">
              <span class="indicator-bar bg-info" style="width: 100%;"></span>
            </div>
          </div>
        </div>

        <!-- Card 3: Quero Assistir -->
        <div class="col-6 col-md-3">
          <div
            class="stat-card p-3 rounded-3 cursor-pointer transition-all"
            :class="{ 'stat-card-active active-planned': store.filtroStatus === 'quero_assistir' }"
            @click="definirFiltroStatus('quero_assistir')"
            role="button"
            title="Clique para filtrar animes que você quer assistir"
          >
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-muted small fw-semibold text-uppercase">Na Fila</span>
              <div class="stat-badge stat-badge-purple">
                <i class="bi bi-bookmark-heart-fill"></i>
              </div>
            </div>
            <div class="fs-2 fw-black text-white font-display">{{ store.totalQueroAssistir }}</div>
            <div class="stat-indicator mt-1">
              <span class="indicator-bar bg-purple" style="width: 100%;"></span>
            </div>
          </div>
        </div>

        <!-- Card 4: Favoritos -->
        <div class="col-6 col-md-3">
          <div
            class="stat-card p-3 rounded-3 cursor-pointer transition-all"
            :class="{ 'stat-card-active active-gold': store.filtroStatus === 'favoritos' }"
            @click="definirFiltroStatus('favoritos')"
            role="button"
            title="Clique para filtrar seus animes favoritos"
          >
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-muted small fw-semibold text-uppercase">Favoritos</span>
              <div class="stat-badge stat-badge-gold">
                <i class="bi bi-star-fill"></i>
              </div>
            </div>
            <div class="fs-2 fw-black text-white font-display">{{ store.totalFavoritos }}</div>
            <div class="stat-indicator mt-1">
              <span class="indicator-bar bg-warning" style="width: 100%;"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-accent {
  color: var(--av-accent);
}

.status-pill-badge {
  background: rgba(0, 245, 212, 0.1);
  border: 1px solid rgba(0, 245, 212, 0.25);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--av-accent);
  box-shadow: 0 0 8px var(--av-accent);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.25); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.8; }
}

.glow-orb {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  pointer-events: none;
}

.glow-orb-purple {
  top: -80px;
  right: -50px;
  background: var(--av-primary);
}

.glow-orb-cyan {
  bottom: -90px;
  left: -50px;
  background: var(--av-accent);
}

.stat-icon-total {
  width: 48px;
  height: 48px;
  background: rgba(0, 245, 212, 0.12);
  border: 1px solid rgba(0, 245, 212, 0.3);
  border-radius: 12px;
}

.stat-card {
  background: rgba(18, 22, 38, 0.6);
  border: 1px solid var(--av-border-glass);
  transition: all 0.25s ease;
}

.stat-card:hover {
  background: rgba(28, 34, 58, 0.85);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.stat-card-active {
  background: rgba(25, 32, 54, 0.95) !important;
}

.active-completed {
  border-color: var(--av-status-completed) !important;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.25);
}

.active-watching {
  border-color: var(--av-status-watching) !important;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.25);
}

.active-planned {
  border-color: var(--av-status-planned) !important;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.25);
}

.active-gold {
  border-color: var(--av-gold) !important;
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.25);
}

.stat-badge {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
}

.stat-badge-green {
  background: rgba(16, 185, 129, 0.15);
  color: var(--av-status-completed);
}

.stat-badge-cyan {
  background: rgba(6, 182, 212, 0.15);
  color: var(--av-status-watching);
}

.stat-badge-purple {
  background: rgba(168, 85, 247, 0.15);
  color: var(--av-status-planned);
}

.stat-badge-gold {
  background: rgba(245, 158, 11, 0.15);
  color: var(--av-gold);
}

.stat-indicator {
  height: 3px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.indicator-bar {
  display: block;
  height: 100%;
}

.bg-purple {
  background-color: var(--av-status-planned);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
