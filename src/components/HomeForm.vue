<template>
  <div
    class="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center py-5"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5 col-xl-4">
          <!-- Card do Formulário -->
          <div
            class="card bg-secondary text-white shadow-lg border-0 rounded-4 p-4"
          >
            <!-- Título -->
            <div class="text-center mb-4">
              <h3 class="text-uppercase fw-bold text-warning">Acessar Conta</h3>
              <p class="text-white-50 small">
                Insira suas credenciais para entrar no sistema
              </p>
            </div>

            <!-- Alerta de Erro (Exibido apenas se loginError for true) -->
            <div
              v-if="loginError"
              class="alert alert-danger py-2 small text-center"
              role="alert"
            >
              <i class="bi bi-exclamation-triangle-fill me-1"></i> E-mail ou
              senha incorretos. Tente novamente.
            </div>

            <!-- Formulário -->
            <form @submit.prevent="handleLogin">
              <!-- Campo E-mail -->
              <div class="mb-3">
                <label
                  for="emailInput"
                  class="form-label text-white fw-semibold"
                  >E-mail</label
                >
                <div class="input-group">
                  <span class="input-group-text bg-dark text-warning border-0">
                    <i class="bi bi-envelope-fill"></i>
                  </span>
                  <input
                    type="email"
                    id="emailInput"
                    v-model="form.email"
                    class="form-control bg-dark text-white border-0 py-2"
                    placeholder="admin@exemplo.com"
                    required
                  />
                </div>
              </div>

              <!-- Campo Senha -->
              <div class="mb-3">
                <label
                  for="passwordInput"
                  class="form-label text-white fw-semibold"
                  >Senha</label
                >
                <div class="input-group">
                  <span class="input-group-text bg-dark text-warning border-0">
                    <i class="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    id="passwordInput"
                    v-model="form.password"
                    class="form-control bg-dark text-white border-0 py-2"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <!-- Manter Conectado & Esqueceu a senha -->
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input border-0"
                    id="rememberMe"
                    v-model="form.rememberMe"
                  />
                  <label
                    class="form-check-label text-white-50 small user-select-none"
                    for="rememberMe"
                  >
                    Manter conectado
                  </label>
                </div>
                <a href="#" class="text-warning small text-decoration-none"
                  >Esqueceu a senha?</a
                >
              </div>

              <!-- Botão de Login -->
              <div class="d-grid mb-3">
                <button
                  type="submit"
                  class="btn btn-warning fw-bold text-dark py-2 shadow-sm"
                >
                  Entrar
                </button>
              </div>
            </form>

            <!-- Rodapé do Card (Registro) -->
            <div class="text-center mt-3">
              <p class="small text-white-50 mb-0">
                Não tem uma conta?
                <a
                  href="#"
                  class="text-warning text-decoration-none fw-semibold"
                  >Cadastre-se</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoginComponent",
  data() {
    return {
      // Credenciais corretas predefinidas para simulação
      validEmail: "ricardo@gmail.com",
      validPassword: "123456",

      form: {
        email: "",
        password: "",
        rememberMe: false,
      },
      loginError: false, // Controla a exibição da mensagem de erro
    };
  },
  methods: {
    handleLogin() {
      // Validação das credenciais inseridas em comparação com as corretas
      if (
        this.form.email === this.validEmail &&
        this.form.password === this.validPassword
      ) {
        this.loginError = false;
        alert("Login realizado com sucesso! Bem-vindo.");
        // Aqui você faria o redirecionamento (ex: this.$router.push('/dashboard'))
      } else {
        this.loginError = true; // Ativa a exibição do alerta de erro
      }
    },
  },
};
</script>

<style scoped>
.form-control:focus {
  background-color: #212529 !important;
  color: #fff !important;
  box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
}

.form-check-input:checked {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-warning:hover {
  background-color: #ffca2c;
  transform: translateY(-1px);
  transition: all 0.2s ease-in-out;
}
</style>
