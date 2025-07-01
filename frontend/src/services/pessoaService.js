import api from "./api";

const pessoaService = {
  // Cadastrar uma nova pessoa (com endereço)
  async cadastrarPessoa(dadosPessoa) {
    try {
      // 1. Primeiro criar o endereço
      const dadosEndereco = {
        neighborhood: dadosPessoa.bairro,
        street: dadosPessoa.endereco,
        number: parseInt(dadosPessoa.numero),
        complement: dadosPessoa.complemento || "N/A", // Backend exige campo não vazio
        referencePoint: dadosPessoa.pontoReferencia || "N/A", // Backend exige campo não vazio
      };

      const enderecoResponse = await api.post("/addresses", dadosEndereco);

      // 2. Depois criar a pessoa com o ID do endereço
      const dadosPessoaApi = {
        name: dadosPessoa.nomeCompleto,
        phone: dadosPessoa.telefoneCelular,
        email: dadosPessoa.email,
        cpf: dadosPessoa.cpfCrnm || dadosPessoa.cpf,
        idAddress: enderecoResponse.data.id,
      };

      const response = await api.post("/people", dadosPessoaApi);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar pessoa:", error);
      throw error;
    }
  },

  // Buscar pessoa por ID
  async buscarPessoaPorId(id) {
    try {
      const response = await api.get(`/people/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar pessoa:", error);
      throw error;
    }
  },

  // Atualizar pessoa
  async atualizarPessoa(id, dadosPessoa) {
    try {
      // Buscar pessoa atual para obter o ID do endereço
      const pessoaAtual = await this.buscarPessoaPorId(id);

      if (!pessoaAtual.address?.id) {
        throw new Error("Pessoa não possui endereço associado");
      }

      // 1. Atualizar o endereço
      const dadosEndereco = {
        neighborhood: dadosPessoa.bairro,
        street: dadosPessoa.endereco,
        number: parseInt(dadosPessoa.numero),
        complement: dadosPessoa.complemento || "N/A", // Backend exige campo não vazio
        referencePoint: dadosPessoa.pontoReferencia || "N/A", // Backend exige campo não vazio
      };

      await api.put(`/addresses/${pessoaAtual.address.id}`, dadosEndereco);

      // 2. Atualizar a pessoa
      const dadosPessoaApi = {
        name: dadosPessoa.nomeCompleto,
        phone: dadosPessoa.telefoneCelular,
        email: dadosPessoa.email,
        cpf: dadosPessoa.cpfCrnm || dadosPessoa.cpf,
        idAddress: pessoaAtual.address.id,
      };

      const response = await api.put(`/people/${id}`, dadosPessoaApi);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar pessoa:", error);
      throw error;
    }
  },

  // Excluir pessoa
  async excluirPessoa(id) {
    try {
      const response = await api.delete(`/people/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
      throw error;
    }
  },
};

export default pessoaService;
