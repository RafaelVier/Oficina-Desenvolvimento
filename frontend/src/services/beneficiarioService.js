import api from "./api";
import pessoaService from "./pessoaService";

/**
 * Serviço para gerenciar beneficiários (receivers)
 *
 * Estrutura da API atualizada:
 * ReceiverResponseDto {
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
 *   nif: string,
 *   isFit: boolean
 * }
 *
 * NOTA: receiverLimit foi removido da estrutura principal
 */

const beneficiarioService = {
  // Cadastrar um novo beneficiário
  async cadastrarBeneficiario(dadosBeneficiario) {
    try {
      // Preparar dados conforme ReceiverRequestDto
      const requestDto = {
        personId: dadosBeneficiario.personId, // UUID da pessoa
        isFit: dadosBeneficiario.isFit || true, // Padrão: apto
        nif: dadosBeneficiario.nif || null,
      };

      const response = await api.post("/receivers", requestDto);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar beneficiário:", error);
      throw error;
    }
  },

  // Listar todos os beneficiários
  async listarBeneficiarios() {
    try {
      const response = await api.get("/receivers");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar beneficiários:", error);
      throw error;
    }
  },

  // Buscar beneficiário por ID
  async buscarBeneficiarioPorId(id) {
    try {
      const response = await api.get(`/receivers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar beneficiário:", error);
      throw error;
    }
  },

  // Buscar beneficiário detalhado
  async buscarBeneficiarioDetalhado(id) {
    try {
      // O ReceiverResponseDto já inclui PersonResponseDto
      const beneficiario = await this.buscarBeneficiarioPorId(id);
      return beneficiario;
    } catch (error) {
      console.error("Erro ao buscar beneficiário detalhado:", error);
      throw error;
    }
  },

  // Atualizar beneficiário
  async atualizarBeneficiario(id, dadosBeneficiario) {
    try {
      // Preparar dados conforme ReceiverRequestDto
      const requestDto = {
        personId: dadosBeneficiario.personId,
        isFit: dadosBeneficiario.isFit,
        nif: dadosBeneficiario.nif || null,
      };

      const response = await api.put(`/receivers/${id}`, requestDto);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar beneficiário:", error);
      throw error;
    }
  },

  // Excluir beneficiário
  async excluirBeneficiario(id) {
    try {
      const response = await api.delete(`/receivers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir beneficiário:", error);
      throw error;
    }
  },

  // Cadastrar beneficiário completo (pessoa + beneficiário)
  async cadastrarBeneficiarioCompleto(dadosCompletos) {
    try {
      // 1. Primeiro cadastrar a pessoa (que criará o endereço automaticamente)
      const dadosPessoa = {
        nomeCompleto: dadosCompletos.nomeCompleto,
        telefoneCelular: dadosCompletos.telefoneCelular,
        email: dadosCompletos.email,
        cpfCrnm: dadosCompletos.cpfCrnm, // Campo correto para o CPF
        endereco: dadosCompletos.endereco,
        bairro: dadosCompletos.bairro,
        numero: dadosCompletos.numero,
        complemento: dadosCompletos.complemento || "",
        pontoReferencia: dadosCompletos.pontoReferencia || "",
      };

      const pessoaCadastrada = await pessoaService.cadastrarPessoa(dadosPessoa);

      // 2. Depois cadastrar o beneficiário associado à pessoa
      const dadosBeneficiario = {
        personId: pessoaCadastrada.id,
        isFit: dadosCompletos.isFit || true,
        nif: dadosCompletos.nif || null,
      };

      const beneficiarioCadastrado = await this.cadastrarBeneficiario(
        dadosBeneficiario
      );

      return beneficiarioCadastrado;
    } catch (error) {
      console.error("Erro ao cadastrar beneficiário completo:", error);
      throw error;
    }
  },

  // Atualizar beneficiário completo (pessoa + beneficiário)
  async atualizarBeneficiarioCompleto(id, dadosCompletos) {
    try {
      // 1. Buscar o beneficiário atual para obter o personId
      const beneficiarioAtual = await this.buscarBeneficiarioPorId(id);

      if (!beneficiarioAtual || !beneficiarioAtual.person?.id) {
        throw new Error("Beneficiário não encontrado ou sem pessoa associada");
      }

      // 2. Atualizar os dados da pessoa
      const dadosPessoa = {
        nomeCompleto: dadosCompletos.nomeCompleto,
        telefoneCelular: dadosCompletos.telefoneCelular,
        email: dadosCompletos.email,
        cpfCrnm: dadosCompletos.cpfCrnm,
        endereco: dadosCompletos.endereco,
        bairro: dadosCompletos.bairro,
        numero: dadosCompletos.numero,
        complemento: dadosCompletos.complemento || "",
        pontoReferencia: dadosCompletos.pontoReferencia || "",
      };

      await pessoaService.atualizarPessoa(
        beneficiarioAtual.person.id,
        dadosPessoa
      );

      // 3. Atualizar os dados do beneficiário
      const dadosBeneficiario = {
        personId: beneficiarioAtual.person.id,
        isFit:
          dadosCompletos.isFit !== undefined
            ? dadosCompletos.isFit
            : beneficiarioAtual.isFit,
        nif: dadosCompletos.nif || null,
      };

      const beneficiarioAtualizado = await this.atualizarBeneficiario(
        id,
        dadosBeneficiario
      );

      return beneficiarioAtualizado;
    } catch (error) {
      console.error("Erro ao atualizar beneficiário completo:", error);
      throw error;
    }
  },
};

export default beneficiarioService;
