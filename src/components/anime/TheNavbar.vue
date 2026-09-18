<script setup lang="ts">
import { ref } from 'vue';
import { useAnimeStore } from '../../stores/animeStore';
import { RouterLink } from 'vue-router';

const store = useAnimeStore();
const fileInputRef = ref<HTMLInputElement | null>(null);
const isMenuOpen = ref(false);

const dispararImportacao = () => {
  fileInputRef.value?.click();
};

const handleArquivoImportado = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const conteudo = e.target?.result as string;
    if (conteudo) {
      const sucesso = store.importarBackup(conteudo);
      if (sucesso) {
        alert('Backup do AniVault importado com sucesso!');
      } else {
        alert('Erro ao processar arquivo de backup. Verifique se o formato é um JSON válido.');
      }
    }
  };
  reader.readAsText(file);
  // Limpa o input para permitir importar o mesmo arquivo se necessário
  target.value = '';
};

const confirmarReset = () => {
  if (confirm('Deseja restaurar a lista inicial padrão com animes de exemplo? Seus animes personalizados serão substituídos.')) {
    store.resetarCatalogo();
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top glass-panel border-bottom border-secondary border-opacity-25 py-2 px-3">
    <div class="container-fluid max-w-7xl">
      <!-- Marca AniVault (Logo e Tipografia) -->
      <RouterLink to="/" class="navbar-brand d-flex align-items-center text-decoration-none me-4">
        <!-- Ícone do Logo estilizado -->
        <div class="logo-box me-2 d-flex align-items-center justify-content-center">
          <i class="bi bi-play-circle-fill fs-4 text-accent"></i>
        </div>

        <div class="d-flex flex-column">
          <div class="d-flex align-items-center gap-1">
            <span class="fw-black fs-4 text-white font-display tracking-wider">ANI<span class="text-accent">VAULT</span></span>
            <span class="badge kanji-badge text-uppercase ms-1">アニ記録</span>
          </div>
          <small class="brand-subtitle text-muted d-none d-sm-block">Seu Universo Anime</small>
        </div>
      </RouterLink>

      <!-- Barra de Busca Rápida no Desktop -->
      <div class="search-container flex-grow-1 mx-lg-4 d-none d-md-block" style="max-width: 480px;">
        <div class="input-group">
          <span class="input-group-text anivault-input border-end-0 text-muted">
            <i class="bi bi-search"></i>
          </span>
          <input
            type="text"
            v-model="store.buscaTexto"
            class="form-control anivault-input border-start-0 ps-1 py-2"
            placeholder="Buscar por título, gênero ou nome original..."
            aria-label="Buscar Anime"
          />
          <button
            v-if="store.buscaTexto"
            class="input-group-text anivault-input border-start-0 text-muted"
            @click="store.buscaTexto = ''"
            title="Limpar busca"
          >
            <i class="bi bi-x-circle-fill"></i>
          </button>
        </div>
      </div>

      <!-- Botão Hamburguer Mobile -->
      <button
        class="navbar-toggler border-0 text-white shadow-none ms-auto"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle navigation"
      >
        <i class="bi" :class="isMenuOpen ? 'bi-x-lg' : 'bi-list'" style="font-size: 1.6rem"></i>
      </button>

      <!-- Menu e Ações à Direita -->
      <div class="collapse navbar-collapse justify-content-end" :class="{ show: isMenuOpen }">
        <!-- Busca visível no Mobile -->
        <div class="d-md-none my-3">
          <div class="input-group">
            <span class="input-group-text anivault-input border-end-0 text-muted">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              v-model="store.buscaTexto"
              class="form-control anivault-input border-start-0 ps-1"
              placeholder="Buscar animes..."
            />
          </div>
        </div>

        <div class="d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-2 mt-lg-0">
          <!-- Botão Principal + Adicionar Anime -->
          <button
            class="btn btn-anivault-primary py-2 px-3"
            @click="store.abrirModalCadastro()"
          >
            <i class="bi bi-plus-circle-fill"></i>
            <span>Adicionar Anime</span>
          </button>

          <!-- Dropdown de Opções & Backup -->
          <div class="dropdown">
            <button
              class="btn btn-anivault-outline dropdown-toggle py-2 px-3 d-flex align-items-center gap-2 w-100 justify-content-center"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-gear-wide-connected text-accent"></i>
              <span>Dados</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg border-secondary border-opacity-50 py-2">
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2 py-2" @click="store.exportarBackup()">
                  <i class="bi bi-download text-success"></i>
                  <span>Exportar Backup (JSON)</span>
                </button>
              </li>
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2 py-2" @click="dispararImportacao">
                  <i class="bi bi-upload text-info"></i>
                  <span>Importar Backup (JSON)</span>
                </button>
              </li>
              <li><hr class="dropdown-divider border-secondary border-opacity-25" /></li>
              <li>
                <button class="dropdown-item d-flex align-items-center gap-2 py-2 text-warning" @click="confirmarReset">
                  <i class="bi bi-arrow-counterclockwise"></i>
                  <span>Restaurar Catálogo Padrão</span>
                </button>
              </li>
            </ul>
          </div>

          <!-- Input oculto para importação de arquivo -->
          <input
            type="file"
            ref="fileInputRef"
            accept=".json"
            class="d-none"
            @change="handleArquivoImportado"
          />

          <!-- Link para Tela de Login / Conta -->
          <RouterLink
            to="/login"
            class="btn btn-outline-secondary text-white-50 border-0 py-2 px-3 d-flex align-items-center gap-2"
            title="Acessar Conta / Formulário"
          >
            <i class="bi bi-person-circle"></i>
            <span class="small">Login</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logo-box {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.35) 0%, rgba(0, 245, 212, 0.2) 100%);
  border: 1px solid rgba(0, 245, 212, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);
  transition: transform 0.3s ease;
}

.logo-box:hover {
  transform: rotate(5deg) scale(1.05);
}

.text-accent {
  color: var(--av-accent) !important;
}

.kanji-badge {
  background: rgba(124, 58, 237, 0.25);
  color: #c4b5fd;
  border: 1px solid rgba(124, 58, 237, 0.5);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 6px;
}

.brand-subtitle {
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  line-height: 1;
}

.max-w-7xl {
  max-width: 1400px;
}
</style>
