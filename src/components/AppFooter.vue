<template>
  <footer class="bg-dark text-white pt-5 pb-4">
    <div class="container text-center text-md-start">
      <div class="row text-center text-md-start">
        <!-- Coluna 1: Sobre / Marca -->
        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h5 class="text-uppercase mb-4 font-weight-bold text-warning">
            Nome da Empresa
          </h5>
          <p>
            Aqui você pode usar linhas e parágrafos para organizar o conteúdo do
            seu rodapé. Este componente foi construído utilizando Vue.js e
            estilizado com Bootstrap.
          </p>
        </div>

        <!-- Coluna 2: Links Úteis -->
        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
          <h5 class="text-uppercase mb-4 font-weight-bold text-warning">
            Produtos
          </h5>
          <p>
            <a href="#" class="text-white text-decoration-none">MDBootstrap</a>
          </p>
          <p>
            <a href="#" class="text-white text-decoration-none">MDWordPress</a>
          </p>
          <p>
            <a href="#" class="text-white text-decoration-none">BrandFlow</a>
          </p>
          <p>
            <a href="#" class="text-white text-decoration-none"
              >Bootstrap Angular</a
            >
          </p>
        </div>

        <!-- Coluna 3: Links Úteis / Navegação -->
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
          <h5 class="text-uppercase mb-4 font-weight-bold text-warning">
            Links Úteis
          </h5>
          <p>
            <a href="#" class="text-white text-decoration-none">Sua Conta</a>
          </p>
          <p>
            <a href="#" class="text-white text-decoration-none"
              >Tornar-se Afiliado</a
            >
          </p>
          <p>
            <a href="#" class="text-white text-decoration-none"
              >Taxas de Envio</a
            >
          </p>
          <p>
            <a href="#" class="text-white text-decoration-none">Ajuda</a>
          </p>
        </div>

        <!-- Coluna 4: Contato -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
          <h5 class="text-uppercase mb-4 font-weight-bold text-warning">
            Contato
          </h5>
          <p>
            <i class="bi bi-house-door-fill me-2"></i> Nova York, NY 10012, US
          </p>
          <p><i class="bi bi-envelope-fill me-2"></i> info@exemplo.com</p>
          <p><i class="bi bi-telephone-fill me-2"></i> + 01 234 567 88</p>
          <p><i class="bi bi-printer-fill me-2"></i> + 01 234 567 89</p>
        </div>
      </div>

      <hr class="mb-4" />

      <!-- Linha inferior: Direitos autorais e Redes Sociais -->
      <div class="row align-items-center">
        <!-- Direitos autorais -->
        <div class="col-md-7 col-lg-8 text-center text-md-start">
          <p>
            © {{ currentYear }} Copyright:
            <a href="#" class="text-warning text-decoration-none">
              <strong>SeuSite.com</strong>
            </a>
          </p>
        </div>

        <!-- Redes Sociais (Utilizando ícones do Bootstrap Icons) -->
        <div class="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
          <a
            href="#"
            class="btn btn-outline-light btn-floating m-1 text-white"
            role="button"
          >
            <i class="bi bi-facebook"></i>
          </a>
          <a
            href="#"
            class="btn btn-outline-light btn-floating m-1 text-white"
            role="button"
          >
            <i class="bi bi-twitter"></i>
          </a>
          <a
            href="#"
            class="btn btn-outline-light btn-floating m-1 text-white"
            role="button"
          >
            <i class="bi bi-google"></i>
          </a>
          <a
            href="#"
            class="btn btn-outline-light btn-floating m-1 text-white"
            role="button"
          >
            <i class="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return {
      currentYear: new Date().getFullYear(), // Atualiza o ano dinamicamente no copyright
    };
  },
};
</script>

<style scoped>
/* Estilos locais adicionais (opcional), caso queira refinar algo que o Bootstrap não cubra */
footer a:hover {
  color: #ffc107 !important; /* Efeito hover nos links */
  transition: color 0.2s ease-in-out;
}
</style>
