import api from "./api";

/**
 * Serviço de autenticação para voluntários
 *
 * Utiliza o endpoint de autenticação do backend para validar
 * as credenciais do voluntário (CPF + Senha)
 */

const authService = {
  // Autenticar voluntário com CPF e senha
  async autenticarVoluntario(cpf, senha) {
    try {
      // Limpar CPF (remover caracteres especiais)
      const cpfLimpo = cpf.replace(/\D/g, "");

      const dadosAuth = {
        cpf: cpfLimpo,
        password: senha,
      };

      console.log("Tentando autenticar voluntário com CPF:", cpfLimpo);

      const response = await api.post("/voluntaries/auth", dadosAuth);

      // Salvar dados do voluntário logado no localStorage
      if (response.data && response.data.voluntary) {
        localStorage.setItem(
          "voluntarioLogado",
          JSON.stringify(response.data.voluntary)
        );
        console.log(
          "Voluntário autenticado com sucesso:",
          response.data.voluntary.person.name
        );
      }

      return response.data.voluntary;
    } catch (error) {
      console.error("Erro na autenticação:", error);

      // Remover dados antigos em caso de erro
      localStorage.removeItem("voluntarioLogado");

      // Retornar erro mais específico
      if (error.response?.status === 401) {
        throw new Error("CPF ou senha incorretos.");
      } else if (error.response?.status === 403) {
        throw new Error("Voluntário inativo. Contate o administrador.");
      } else if (error.response?.status === 404) {
        throw new Error("Voluntário não encontrado.");
      } else if (error.response?.status >= 500) {
        throw new Error(
          "Erro interno do servidor. Tente novamente mais tarde."
        );
      } else {
        throw new Error("Erro ao conectar com o servidor.");
      }
    }
  },

  // Verificar se há voluntário logado
  getVoluntarioLogado() {
    try {
      const voluntario = localStorage.getItem("voluntarioLogado");
      return voluntario ? JSON.parse(voluntario) : null;
    } catch (error) {
      console.error("Erro ao recuperar voluntário logado:", error);
      localStorage.removeItem("voluntarioLogado");
      return null;
    }
  },

  // Fazer logout
  logout() {
    localStorage.removeItem("voluntarioLogado");
    console.log("Logout realizado com sucesso");
  },

  // Verificar se voluntário está logado
  isLoggedIn() {
    return this.getVoluntarioLogado() !== null;
  },
};

export default authService;
