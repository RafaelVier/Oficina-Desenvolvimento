import api from "./api";
import pessoaService from "./pessoaService";

/**
 * Serviço para gerenciar voluntários (voluntaries)
 *
 * Estrutura da API:
 * VoluntaryResponseDto {
 *   id: UUID,
 *   person: PersonResponseDto {
 *     id: UUID,
 *     name: string,
 *     phone: string,
 *     email: string,
 *     cpf: string,
 *     address: AddressResponseDto {
 *       id: UUID,
 *       number: integer,
 *       street: string,
 *       neighborhood: string,
 *       complement: string,
 *       referencePoint: string
 *     }
 *   },
 *   active: boolean
 * }
 *
 * VoluntaryRequestDto {
 *   personId: UUID,
 *   password: string,
 *   isActive: boolean
 * }
 */

const voluntarioService = {
  // Cadastrar um novo voluntário
  async cadastrarVoluntario(dadosVoluntario) {
    try {
      // Preparar dados conforme VoluntaryRequestDto
      const requestDto = {
        personId: dadosVoluntario.personId, // UUID da pessoa
        password: dadosVoluntario.password, // Senha do voluntário
        isActive:
          dadosVoluntario.isActive !== undefined
            ? dadosVoluntario.isActive
            : true, // Padrão: ativo
      };

      const response = await api.post("/voluntaries/", requestDto);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar voluntário:", error);
      throw error;
    }
  },

  // Listar todos os voluntários
  async listarVoluntarios() {
    try {
      const response = await api.get("/voluntaries");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar voluntários:", error);
      throw error;
    }
  },

  // Buscar voluntário por ID
  async buscarVoluntarioPorId(id) {
    try {
      const response = await api.get(`/voluntaries/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar voluntário:", error);
      throw error;
    }
  },

  // Buscar voluntário detalhado
  async buscarVoluntarioDetalhado(id) {
    try {
      // O VoluntaryResponseDto já inclui PersonResponseDto
      const voluntario = await this.buscarVoluntarioPorId(id);
      return voluntario;
    } catch (error) {
      console.error("Erro ao buscar voluntário detalhado:", error);
      throw error;
    }
  },

  // Atualizar voluntário
  async atualizarVoluntario(id, dadosVoluntario) {
    try {
      // Preparar dados conforme VoluntaryRequestDto
      const requestDto = {
        personId: dadosVoluntario.personId,
        password: dadosVoluntario.password,
        isActive: dadosVoluntario.isActive,
      };

      const response = await api.put(`/voluntaries/${id}`, requestDto);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar voluntário:", error);
      throw error;
    }
  },

  // Excluir voluntário
  async excluirVoluntario(id) {
    try {
      const response = await api.delete(`/voluntaries/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir voluntário:", error);
      throw error;
    }
  },

  // Cadastrar voluntário completo (pessoa + voluntário)
  async cadastrarVoluntarioCompleto(dadosCompletos) {
    try {
      // 1. Primeiro cadastrar a pessoa (que criará o endereço automaticamente)
      const dadosPessoa = {
        nomeCompleto: dadosCompletos.nomeCompleto,
        telefoneCelular: dadosCompletos.telefoneCelular,
        email: dadosCompletos.email,
        cpfCrnm: dadosCompletos.cpf, // Campo correto para o CPF
        endereco: dadosCompletos.endereco,
        bairro: dadosCompletos.bairro,
        numero: dadosCompletos.numero,
        complemento: dadosCompletos.complemento || "",
        pontoReferencia: dadosCompletos.pontoReferencia || "",
      };

      const pessoaCadastrada = await pessoaService.cadastrarPessoa(dadosPessoa);

      // 2. Depois cadastrar o voluntário associado à pessoa
      const dadosVoluntario = {
        personId: pessoaCadastrada.id,
        password: dadosCompletos.password, // Senha fornecida
        isActive:
          dadosCompletos.isActive !== undefined
            ? dadosCompletos.isActive
            : true,
      };

      const voluntarioCadastrado = await this.cadastrarVoluntario(
        dadosVoluntario
      );

      return voluntarioCadastrado;
    } catch (error) {
      console.error("Erro ao cadastrar voluntário completo:", error);
      throw error;
    }
  },

  // Atualizar voluntário completo (pessoa + voluntário)
  async atualizarVoluntarioCompleto(id, dadosCompletos) {
    try {
      // 1. Buscar o voluntário atual para obter o personId
      const voluntarioAtual = await this.buscarVoluntarioPorId(id);

      if (!voluntarioAtual || !voluntarioAtual.person?.id) {
        throw new Error("Voluntário não encontrado ou sem pessoa associada");
      }

      // 2. Atualizar os dados da pessoa
      const dadosPessoa = {
        nomeCompleto: dadosCompletos.nomeCompleto,
        telefoneCelular: dadosCompletos.telefoneCelular,
        email: dadosCompletos.email,
        cpfCrnm: dadosCompletos.cpf,
        endereco: dadosCompletos.endereco,
        bairro: dadosCompletos.bairro,
        numero: dadosCompletos.numero,
        complemento: dadosCompletos.complemento || "",
        pontoReferencia: dadosCompletos.pontoReferencia || "",
      };

      await pessoaService.atualizarPessoa(
        voluntarioAtual.person.id,
        dadosPessoa
      );

      // 3. Atualizar os dados do voluntário
      const dadosVoluntario = {
        personId: voluntarioAtual.person.id,
        password: dadosCompletos.password, // Senha atualizada
        isActive:
          dadosCompletos.isActive !== undefined
            ? dadosCompletos.isActive
            : voluntarioAtual.active,
      };

      const voluntarioAtualizado = await this.atualizarVoluntario(
        id,
        dadosVoluntario
      );

      return voluntarioAtualizado;
    } catch (error) {
      console.error("Erro ao atualizar voluntário completo:", error);
      throw error;
    }
  },
};

export default voluntarioService;
