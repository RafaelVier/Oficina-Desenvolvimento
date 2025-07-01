"use client";
import React, { useEffect, useState } from "react";
import MenuBar from "../../components/menubar/menubar";
import Navigation from "../../components/navegation/navegation";
import styles from "./lista.module.css";
import { useRouter } from "next/navigation";
import modalStyles from "./lista.module.css";
import beneficiarioService from "../../../services/beneficiarioService";

export default function ListaBeneficiarios() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const carregarBeneficiarios = async () => {
      setLoading(true);
      setError("");
      try {
        const dados = await beneficiarioService.listarBeneficiarios();
        setBeneficiarios(dados);
      } catch (err) {
        console.error("Erro ao carregar beneficiários:", err);

        let mensagemErro = "Erro ao carregar beneficiários";
        if (err.response?.status >= 500) {
          mensagemErro = "Servidor indisponível. Tente novamente mais tarde.";
        } else if (err.response?.status === 404) {
          mensagemErro =
            "Endpoint não encontrado. Verifique a configuração da API.";
        }

        setError(mensagemErro);

        /* === FALLBACK PARA MOCK EM CASO DE ERRO ===
        try {
          const mock = JSON.parse(localStorage.getItem('mockBeneficiarios') || '[]');
          setBeneficiarios(mock);
          setError("Carregando dados do mock local (API indisponível)");
        } catch (mockErr) {
          setError("Erro ao carregar beneficiários do mock e da API");
        }
        === FIM DO FALLBACK === */
      } finally {
        setLoading(false);
      }
    };

    carregarBeneficiarios();
  }, []);

  const handleEdit = (id) => {
    router.push(`/cadastrobeneficiario/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este beneficiário?"))
      return;
    setLoading(true);
    setError("");
    try {
      await beneficiarioService.excluirBeneficiario(id);

      // Recarregar a lista após exclusão
      const dados = await beneficiarioService.listarBeneficiarios();
      setBeneficiarios(dados);

      alert("Beneficiário excluído com sucesso!");

      /* === CÓDIGO MOCK COMENTADO PARA REFERÊNCIA ===
      const novos = beneficiarios.filter((b) => b.id !== id);
      setBeneficiarios(novos);
      localStorage.setItem('mockBeneficiarios', JSON.stringify(novos));
      === FIM DO CÓDIGO MOCK === */
    } catch (err) {
      console.error("Erro ao excluir beneficiário:", err);
      setError("Erro ao excluir beneficiário");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (beneficiario) => {
    // Preparar dados para edição, considerando a estrutura da API (ReceiverResponseDto)
    const dadosParaEdicao = {
      id: beneficiario.id,
      nomeCompleto: beneficiario.person?.name || "", // Campo correto da API
      telefoneCelular: beneficiario.person?.phone || "",
      email: beneficiario.person?.email || "",
      cpfCrnm: beneficiario.person?.cpf || "", // Campo correto da API
      nif: beneficiario.nif || "",
      endereco: beneficiario.person?.address?.street || "",
      bairro: beneficiario.person?.address?.neighborhood || "",
      numero: beneficiario.person?.address?.number?.toString() || "",
      complemento: beneficiario.person?.address?.complement || "",
      pontoReferencia: beneficiario.person?.address?.referencePoint || "",
      isFit: beneficiario.isFit,
    };

    setEditForm(dadosParaEdicao);
    setEditModalOpen(true);
    setEditError("");
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditForm(null);
    setEditError("");
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");

    // Validação: pelo menos um dos campos (CPF/CRNM ou NIF) deve ser preenchido
    const cpfCrnmLimpo = editForm.cpfCrnm.replace(/\D/g, "");
    const nifLimpo = editForm.nif.replace(/\D/g, "");
    if (cpfCrnmLimpo.length === 0 && nifLimpo.length === 0) {
      setEditError(
        "É obrigatório preencher pelo menos um dos campos: CPF/CRNM ou NIF."
      );
      setEditLoading(false);
      return;
    }
    if (cpfCrnmLimpo.length > 0 && cpfCrnmLimpo.length !== 11) {
      setEditError("CPF/CRNM deve conter 11 dígitos numéricos.");
      setEditLoading(false);
      return;
    }
    // Validação de telefone (aceita ambos formatos)
    const telefoneLimpo = editForm.telefoneCelular.replace(/\D/g, "");
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      setEditError(
        "Telefone deve conter entre 10 e 11 dígitos (incluindo DDD)."
      );
      setEditLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(editForm.email)) {
      setEditError("Por favor, insira um e-mail válido.");
      setEditLoading(false);
      return;
    }

    try {
      // Preparar dados para envio à API
      const dadosParaAtualizar = {
        nomeCompleto: editForm.nomeCompleto.trim(),
        telefoneCelular: editForm.telefoneCelular.trim(),
        email: editForm.email.trim(),
        cpfCrnm: cpfCrnmLimpo,
        nif: nifLimpo || null,
        endereco: editForm.endereco.trim(),
        bairro: editForm.bairro.trim(),
        numero: editForm.numero.toString(),
        complemento: editForm.complemento.trim() || "N/A", // Backend exige campo não vazio
        pontoReferencia: editForm.pontoReferencia.trim() || "N/A", // Backend exige campo não vazio
        isFit: editForm.isFit,
      };

      console.log("Atualizando beneficiário:", dadosParaAtualizar);

      await beneficiarioService.atualizarBeneficiarioCompleto(
        editForm.id,
        dadosParaAtualizar
      );

      // Recarregar a lista após edição
      const dados = await beneficiarioService.listarBeneficiarios();
      setBeneficiarios(dados);

      setEditModalOpen(false);
      setEditForm(null);
      alert("Beneficiário atualizado com sucesso!");

      /* === CÓDIGO MOCK COMENTADO PARA REFERÊNCIA ===
      const novos = beneficiarios.map((b) => b.id === editForm.id ? { ...editForm, cpfCrnm: cpfCrnmLimpo, nif: nifLimpo } : b);
      setBeneficiarios(novos);
      localStorage.setItem('mockBeneficiarios', JSON.stringify(novos));
      === FIM DO CÓDIGO MOCK === */
    } catch (err) {
      console.error("Erro ao atualizar beneficiário:", err);

      let mensagemErro = "Erro ao salvar edição";
      if (err.response?.data?.message) {
        mensagemErro = err.response.data.message;
      } else if (err.response?.status === 400) {
        mensagemErro = "Dados inválidos. Verifique os campos preenchidos.";
      } else if (err.response?.status === 404) {
        mensagemErro = "Beneficiário não encontrado.";
      } else if (err.response?.status >= 500) {
        mensagemErro = "Erro interno do servidor. Tente novamente mais tarde.";
      }

      setEditError(mensagemErro);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className={styles.containerGeral}>
      <MenuBar />
      <Navigation />
      <div className={styles.contentWrapper}>
        <div className={styles.listContainer}>
          <h1 className={styles.titulo}>Beneficiários Cadastrados</h1>
          <div className={styles.decoracao}></div>

          <div className={styles.actionsHeader}>
            <button
              className={styles.addButton}
              onClick={() => router.push("/cadastrobeneficiario")}
            >
              + Adicionar Beneficiário
            </button>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.beneficiariosTable}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>NIF</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className={styles.loadingMessage}>
                      Carregando...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className={styles.errorMessage}>
                      {error}
                    </td>
                  </tr>
                ) : beneficiarios.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.noDataMessage}>
                      Nenhum beneficiário cadastrado ainda.
                    </td>
                  </tr>
                ) : (
                  beneficiarios.map((b) => (
                    <tr key={b.id}>
                      <td>{b.person?.name || "–"}</td>
                      <td>{b.person?.email || "–"}</td>
                      <td>{b.person?.phone || "–"}</td>
                      <td>{b.nif || "–"}</td>
                      <td className={styles.actionButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => openEditModal(b)}
                          disabled={loading}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(b.id)}
                          disabled={loading}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      {editModalOpen && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.modalContent}>
            <h2>Editar Beneficiário</h2>
            <form onSubmit={handleEditSubmit}>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editNomeCompleto">
                  <b>Nome completo*</b>
                </label>
                <input
                  id="editNomeCompleto"
                  name="nomeCompleto"
                  value={editForm?.nomeCompleto || ""}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editEmail">
                  <b>E-mail*</b>
                </label>
                <input
                  id="editEmail"
                  name="email"
                  type="email"
                  value={editForm?.email || ""}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editTelefoneCelular">
                  <b>Telefone*</b>
                </label>
                <input
                  id="editTelefoneCelular"
                  name="telefoneCelular"
                  value={editForm?.telefoneCelular || ""}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editCpfCrnm">
                  <b>CPF/CRNM</b>
                </label>
                <input
                  id="editCpfCrnm"
                  name="cpfCrnm"
                  type="text"
                  pattern="[0-9]*"
                  maxLength={11}
                  value={editForm?.cpfCrnm || ""}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    setEditForm({ ...editForm, cpfCrnm: onlyNums });
                  }}
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editNif">
                  <b>NIF</b>
                </label>
                <input
                  id="editNif"
                  name="nif"
                  type="text"
                  pattern="[0-9]*"
                  value={editForm?.nif || ""}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    setEditForm({ ...editForm, nif: onlyNums });
                  }}
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editEndereco">
                  <b>Endereço*</b>
                </label>
                <input
                  id="editEndereco"
                  name="endereco"
                  value={editForm?.endereco || ""}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editNumero">
                  <b>Número*</b>
                </label>
                <input
                  id="editNumero"
                  name="numero"
                  type="number"
                  value={editForm?.numero || ""}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editComplemento">
                  <b>Complemento</b>
                </label>
                <input
                  id="editComplemento"
                  name="complemento"
                  value={editForm?.complemento || ""}
                  onChange={handleEditChange}
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editBairro">
                  <b>Bairro*</b>
                </label>
                <input
                  id="editBairro"
                  name="bairro"
                  value={editForm?.bairro || ""}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="editPontoReferencia">
                  <b>Ponto de referência</b>
                </label>
                <input
                  id="editPontoReferencia"
                  name="pontoReferencia"
                  value={editForm?.pontoReferencia || ""}
                  onChange={handleEditChange}
                />
              </div>
              <div className={modalStyles.buttonGroup}>
                <button type="submit" disabled={editLoading}>
                  {editLoading ? "Salvando..." : "Salvar"}
                </button>
                <button type="button" onClick={closeEditModal}>
                  Cancelar
                </button>
              </div>
              {editError && (
                <div className={modalStyles.errorMessage}>{editError}</div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
