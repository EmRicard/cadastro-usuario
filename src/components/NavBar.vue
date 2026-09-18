<template>
  <header
    class="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm py-3 sticky-top"
  >
    <div class="container">
      <!-- Logo e Título da Marca (Esquerda) -->
      <a
        class="navbar-brand d-flex align-items-center text-decoration-none"
        href="#"
      >
        <!-- Ícone / Logo simulado (ou troque por <img src="..." alt="Logo" class="me-2" height="32" />) -->
        <div
          class="brand-icon rounded-3 bg-dark d-flex align-items-center justify-content-center me-2 shadow-sm"
        >
          <i class="bi bi-box-seam-fill text-warning fs-5"></i>
        </div>
        <span class="fw-bold fs-4 text-warning text-uppercase tracking-wider">
          Sua<span class="text-white">Marca</span>
        </span>
      </a>

      <!-- Botão Hambúrguer para Mobile -->
      <button
        class="navbar-toggler border-0 shadow-none text-warning"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
        aria-controls="navbarNav"
        :aria-expanded="isMenuOpen"
        aria-label="Alternar navegação"
      >
        <i
          class="bi"
          :class="isMenuOpen ? 'bi-x-lg' : 'bi-list'"
          style="font-size: 1.5rem"
        ></i>
      </button>

      <!-- Navegação e Botões (Direita) -->
      <div
        class="collapse navbar-collapse justify-content-end"
        :class="{ show: isMenuOpen }"
        id="navbarNav"
      >
        <ul class="navbar-nav align-items-lg-center gap-2 mt-3 mt-lg-0">
          <!-- Link / Botão Produtos -->
          <li class="nav-item">
            <a
              class="nav-link text-white fw-semibold px-3 py-2 rounded-3 nav-link-custom d-flex align-items-center"
              href="#produtos"
              @click="navegar('produtos')"
            >
              <i class="bi bi-grid-fill text-warning me-2"></i>
              Produtos
            </a>
          </li>

          <!-- Link / Botão Sobre Nós -->
          <li class="nav-item">
            <a
              class="nav-link text-white fw-semibold px-3 py-2 rounded-3 nav-link-custom d-flex align-items-center"
              href="#sobre"
              @click="navegar('sobre')"
            >
              <i class="bi bi-info-circle-fill text-warning me-2"></i>
              Sobre Nós
            </a>
          </li>

          <!-- Botão de Ação / Login opcional de destaque -->
          <li class="nav-item ms-lg-2">
            <button
              type="button"
              class="btn btn-warning fw-bold text-dark px-3 py-2 rounded-3 shadow-sm d-flex align-items-center"
              @click="navegar('login')"
            >
              <i class="bi bi-person-fill me-1"></i>
              Entrar
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    navegar(destino) {
      this.isMenuOpen = false; // Fecha o menu no mobile ao clicar em um link
      console.log(`Navegando para: ${destino}`);
      // Se estiver utilizando vue-router, por exemplo:
      // this.$router.push({ name: destino });
    },
  },
};
</script>

<style scoped>
/* Estilização da caixa da logo */
.brand-icon {
  width: 40px;
  height: 40px;
}

.tracking-wider {
  letter-spacing: 0.5px;
}

/* Efeito de hover nos links de navegação */
.nav-link-custom {
  transition: all 0.2s ease-in-out;
}

.nav-link-custom:hover {
  background-color: #212529 !important; /* bg-dark */
  color: #ffc107 !important; /* text-warning */
  transform: translateY(-1px);
}

/* Efeito de hover no botão amarelo de destaque */
.btn-warning:hover {
  background-color: #ffca2c;
  transform: translateY(-1px);
  transition: all 0.2s ease-in-out;
}
</style>
