import api from "./api";

/**
 * Serviço para operações relacionadas a doadores (Givers)
 */

// Tipos de dados baseados na API do backend
export const doadorService = {
  /**
   * Criar um endereço primeiro (necessário para pessoa)
   */
  criarEndereco: async (enderecoData) => {
    try {
      const response = await api.post("/addresses", {
        neighborhood: enderecoData.bairro,
        street: enderecoData.endereco,
        number: parseInt(enderecoData.numero),
        complement: enderecoData.complemento || "",
        referencePoint: enderecoData.pontoReferencia || "",
      });
      return response.data;
    } catch (error) {
      console.error("[DoadorService] Erro ao criar endereço:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao criar endereço"
      );
    }
  },

  /**
   * Criar uma pessoa (necessário para doador)
   */
  criarPessoa: async (pessoaData, idEndereco) => {
    try {
      const response = await api.post("/people", {
        name: pessoaData.nomeCompleto,
        phone: pessoaData.telefoneCelular,
        email: pessoaData.email,
        cpf: pessoaData.cpf,
        idAddress: idEndereco,
      });
      return response.data;
    } catch (error) {
      console.error("[DoadorService] Erro ao criar pessoa:", error);
      throw new Error(error.response?.data?.message || "Erro ao criar pessoa");
    }
  },

  /**
   * Criar um doador (Giver)
   */
  criarDoador: async (idPessoa) => {
    try {
      const response = await api.post("/givers", {
        personId: idPessoa,
      });
      return response.data;
    } catch (error) {
      console.error("[DoadorService] Erro ao criar doador:", error);
      throw new Error(error.response?.data?.message || "Erro ao criar doador");
    }
  },

  /**
   * Processo completo de cadastro de doador
   */
  cadastrarDoador: async (dadosFormulario) => {
    try {
      console.log("[DoadorService] Iniciando cadastro completo do doador...");

      // 1. Criar endereço
      const endereco = await doadorService.criarEndereco(dadosFormulario);
      console.log("[DoadorService] Endereço criado:", endereco.id);

      // 2. Criar pessoa
      const pessoa = await doadorService.criarPessoa(
        dadosFormulario,
        endereco.id
      );
      console.log("[DoadorService] Pessoa criada:", pessoa.id);

      // 3. Criar doador
      const doador = await doadorService.criarDoador(pessoa.id);
      console.log("[DoadorService] Doador criado:", doador.id);

      return {
        success: true,
        doador: doador,
        pessoa: pessoa,
        endereco: endereco,
      };
    } catch (error) {
      console.error("[DoadorService] Erro no cadastro completo:", error);
      throw error;
    }
  },

  /**
   * Listar todos os doadores
   */
  listarDoadores: async () => {
    try {
      const response = await api.get("/givers");
      return response.data;
    } catch (error) {
      console.error("[DoadorService] Erro ao listar doadores:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao carregar doadores"
      );
    }
  },

  /**
   * Buscar doador por ID
   */
  buscarDoadorPorId: async (id) => {
    try {
      const response = await api.get(`/givers/${id}`);
      return response.data;
    } catch (error) {
      console.error("[DoadorService] Erro ao buscar doador:", error);
      throw new Error(error.response?.data?.message || "Doador não encontrado");
    }
  },

  /**
   * Atualizar dados de uma pessoa
   */
  atualizarPessoa: async (idPessoa, dadosAtualizados, idEndereco) => {
    try {
      const response = await api.put(`/people/${idPessoa}`, {
        name: dadosAtualizados.nomeCompleto,
        phone: dadosAtualizados.telefoneCelular,
        email: dadosAtualizados.email,
        cpf: dadosAtualizados.cpf,
        idAddress: idEndereco,
      });
      return response.data;
    } catch (error) {
      console.error("[DoadorService] Erro ao atualizar pessoa:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar dados"
      );
    }
  },

  /**
   * Atualizar endereço
   */
  atualizarEndereco: async (idEndereco, enderecoData) => {
    try {
      const response = await api.put(`/addresses/${idEndereco}`, {
        neighborhood: enderecoData.bairro,
        street: enderecoData.endereco,
        number: parseInt(enderecoData.numero),
        complement: enderecoData.complemento || "",
        referencePoint: enderecoData.pontoReferencia || "",
      });
      return response.data;
    } catch (error) {
      console.error("[DoadorService] Erro ao atualizar endereço:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar endereço"
      );
    }
  },

  /**
   * Deletar doador
   */
  deletarDoador: async (id) => {
    try {
      const response = await api.delete(`/givers/${id}`);
      return response.data;
    } catch (error) {
      console.error("[DoadorService] Erro ao deletar doador:", error);
      throw new Error(
        error.response?.data?.message || "Erro ao deletar doador"
      );
    }
  },

  /**
   * Listar doadores com dados das pessoas (versão detalhada)
   */
  listarDoadoresDetalhados: async () => {
    try {
      // Buscar todos os doadores
      const doadores = await doadorService.listarDoadores();

      // Para cada doador, buscar os dados da pessoa
      const doadoresDetalhados = await Promise.all(
        doadores.map(async (doador) => {
          try {
            // Buscar dados da pessoa via API /people/{id}
            const pessoa = await api.get(`/people/${doador.personId}`);
            return {
              id: doador.id,
              nomeCompleto: pessoa.data.name,
              email: pessoa.data.email,
              telefoneCelular: pessoa.data.phone,
              cpf: pessoa.data.cpf,
              endereco: pessoa.data.address,
              personId: pessoa.data.id,
            };
          } catch (error) {
            console.warn(
              `[DoadorService] Erro ao buscar pessoa para doador ${doador.id}:`,
              error
            );
            return {
              id: doador.id,
              nomeCompleto: "Erro ao carregar",
              email: "N/A",
              telefoneCelular: "N/A",
              cpf: "N/A",
              endereco: null,
              personId: null,
            };
          }
        })
      );

      return doadoresDetalhados;
    } catch (error) {
      console.error(
        "[DoadorService] Erro ao listar doadores detalhados:",
        error
      );
      throw new Error(
        error.response?.data?.message || "Erro ao carregar doadores"
      );
    }
  },
};

export default doadorService;
