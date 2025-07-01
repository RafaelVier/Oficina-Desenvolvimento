"use client";
import React, { useEffect, useState } from "react";
import MenuBar from "../../components/menubar/menubar";
import Navigation from "../../components/navegation/navegation";
import styles from "./lista.module.css";
import { useRouter } from "next/navigation";
import modalStyles from "./lista.module.css";
import voluntarioService from "../../../services/voluntarioService";

export default function ListaVoluntarios() {
  const [voluntarios, setVoluntarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editError, setEditError] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const carregarVoluntarios = async () => {
      setLoading(true);
      setError("");
      try {
        const dados = await voluntarioService.listarVoluntarios();
        setVoluntarios(dados);
      } catch (err) {
        console.error("Erro ao carregar voluntários:", err);
        setError("Erro ao carregar voluntários da API");

        /* === FALLBACK PARA MOCK EM CASO DE ERRO ===
        try {
          const mock = JSON.parse(localStorage.getItem('mockVoluntarios') || '[]');
          setVoluntarios(mock);
          setError("Carregando dados do mock local (API indisponível)");
        } catch (mockErr) {
          setError("Erro ao carregar voluntários do mock e da API");
        }
        === FIM DO FALLBACK === */
      } finally {
        setLoading(false);
      }
    };

    carregarVoluntarios();
  }, []);

  const handleEdit = (id) => {
    router.push(`/cadastrovoluntario/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este voluntário?"))
      return;
    setLoading(true);
    setError("");
    try {
      await voluntarioService.excluirVoluntario(id);

      // Recarregar a lista após exclusão
      const dados = await voluntarioService.listarVoluntarios();
      setVoluntarios(dados);

      alert("Voluntário excluído com sucesso!");

      /* === CÓDIGO MOCK COMENTADO PARA REFERÊNCIA ===
      const novos = voluntarios.filter((v) => v.id !== id);
      setVoluntarios(novos);
      localStorage.setItem('mockVoluntarios', JSON.stringify(novos));
      === FIM DO CÓDIGO MOCK === */
    } catch (err) {
      console.error("Erro ao excluir voluntário:", err);
      setError("Erro ao excluir voluntário");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (voluntario) => {
    // Preparar dados para edição, considerando a estrutura da API (VoluntaryResponseDto)
    const dadosParaEdicao = {
      id: voluntario.id,
      nomeCompleto: voluntario.person?.name || "", // Campo correto da API
      telefoneCelular: voluntario.person?.phone || "",
      email: voluntario.person?.email || "",
      cpf: voluntario.person?.cpf || "", // Campo correto da API
      endereco: voluntario.person?.address?.street || "",
      bairro: voluntario.person?.address?.neighborhood || "",
      numero: voluntario.person?.address?.number?.toString() || "",
      complemento: voluntario.person?.address?.complement || "",
      pontoReferencia: voluntario.person?.address?.referencePoint || "",
      senha: "", // Senha sempre vazia por segurança
      confirmarSenha: "", // Confirmação sempre vazia
      isActive: voluntario.active,
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

    // Validações
    const cpfLimpo = editForm.cpf.replace(/\D/g, "");
    const telefoneLimpo = editForm.telefoneCelular.replace(/\D/g, "");

    if (cpfLimpo.length !== 11) {
      setEditError("CPF deve conter 11 dígitos numéricos.");
      setEditLoading(false);
      return;
    }

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

    // Validação de senha (se fornecida)
    if (editForm.senha && editForm.senha.length < 6) {
      setEditError("A senha deve ter pelo menos 6 caracteres.");
      setEditLoading(false);
      return;
    }

    // Validação de confirmação de senha (se senha fornecida)
    if (editForm.senha && editForm.senha !== editForm.confirmarSenha) {
      setEditError("A senha e confirmação de senha devem ser iguais.");
      setEditLoading(false);
      return;
    }

    try {
      // Preparar dados para envio à API
      const dadosParaAtualizar = {
        nomeCompleto: editForm.nomeCompleto.trim(),
        telefoneCelular: editForm.telefoneCelular.trim(),
        email: editForm.email.trim(),
        cpf: cpfLimpo,
        endereco: editForm.endereco.trim(),
        bairro: editForm.bairro.trim(),
        numero: editForm.numero.toString(),
        complemento: editForm.complemento.trim() || "N/A", // Backend exige campo não vazio
        pontoReferencia: editForm.pontoReferencia.trim() || "N/A", // Backend exige campo não vazio
        password: editForm.senha || "senha123", // Se não fornecida, manter senha padrão
        isActive: editForm.isActive,
      };

      console.log("Atualizando voluntário:", {
        ...dadosParaAtualizar,
        password: "***",
      });

      await voluntarioService.atualizarVoluntarioCompleto(
        editForm.id,
        dadosParaAtualizar
      );

      // Recarregar a lista após edição
      const dados = await voluntarioService.listarVoluntarios();
      setVoluntarios(dados);

      setEditModalOpen(false);
      setEditForm(null);
      alert("Voluntário atualizado com sucesso!");

      /* === CÓDIGO MOCK COMENTADO PARA REFERÊNCIA ===
      const novos = voluntarios.map((v) => v.id === editForm.id ? { ...editForm } : v);
      setVoluntarios(novos);
      localStorage.setItem('mockVoluntarios', JSON.stringify(novos));
      === FIM DO CÓDIGO MOCK === */
    } catch (err) {
      console.error("Erro ao atualizar voluntário:", err);

      let mensagemErro = "Erro ao salvar edição";
      if (err.response?.data?.message) {
        mensagemErro = err.response.data.message;
      } else if (err.response?.status === 400) {
        mensagemErro = "Dados inválidos. Verifique os campos preenchidos.";
      } else if (err.response?.status === 404) {
        mensagemErro = "Voluntário não encontrado.";
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
          <h1 className={styles.titulo}>Voluntários Cadastrados</h1>
          <div className={styles.decoracao}></div>
          <div className={styles.actionsHeader}>
            <button
              className={styles.addButton}
              onClick={() => router.push("/cadastrovoluntario")}
            >
              + Adicionar Voluntário
            </button>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.beneficiariosTable}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Status</th>
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
                ) : voluntarios.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.noDataMessage}>
                      Nenhum voluntário cadastrado ainda.
                    </td>
                  </tr>
                ) : (
                  voluntarios.map((v) => (
                    <tr key={v.id}>
                      <td>{v.person?.name || "–"}</td>
                      <td>{v.person?.email || "–"}</td>
                      <td>{v.person?.phone || "–"}</td>
                      <td>{v.active ? "Ativo" : "Inativo"}</td>
                      <td className={styles.actionButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => openEditModal(v)}
                          disabled={loading}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(v.id)}
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
      {/* Modal de edição */}
      {editModalOpen && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.modalContent}>
            <h2 className={modalStyles.titulo}>Editar Voluntário</h2>
            <form
              onSubmit={handleEditSubmit}
              className={modalStyles.formulario}
            >
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_nomeCompleto">
                  <b>Nome completo*</b>
                </label>
                <input
                  id="edit_nomeCompleto"
                  name="nomeCompleto"
                  value={editForm.nomeCompleto}
                  onChange={handleEditChange}
                  required
                  placeholder="Fulano da Silva"
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_email">
                  <b>E-mail*</b>
                </label>
                <input
                  id="edit_email"
                  name="email"
                  type="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  required
                  placeholder="fulano@gmail.com"
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_telefoneCelular">
                  <b>Telefone*</b>
                </label>
                <input
                  id="edit_telefoneCelular"
                  name="telefoneCelular"
                  value={editForm.telefoneCelular}
                  onChange={handleEditChange}
                  required
                  placeholder="(45) 9 9988-7766"
                  type="tel"
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_cpf">
                  <b>CPF*</b>
                </label>
                <input
                  id="edit_cpf"
                  name="cpf"
                  type="text"
                  pattern="[0-9]*"
                  maxLength={11}
                  value={editForm.cpf}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    setEditForm({ ...editForm, cpf: onlyNums });
                  }}
                  placeholder="11122233355"
                  required
                />
              </div>

              {/* Campos específicos para voluntário */}
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_senha">
                  <b>Nova Senha (deixe vazio para não alterar)</b>
                </label>
                <input
                  id="edit_senha"
                  name="senha"
                  type="password"
                  value={editForm.senha}
                  onChange={handleEditChange}
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_confirmarSenha">
                  <b>Confirmar Nova Senha</b>
                </label>
                <input
                  id="edit_confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  value={editForm.confirmarSenha}
                  onChange={handleEditChange}
                  placeholder="Repita a nova senha"
                  minLength={6}
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_isActive">
                  <b>Status*</b>
                </label>
                <select
                  id="edit_isActive"
                  name="isActive"
                  value={editForm.isActive}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      isActive: e.target.value === "true",
                    })
                  }
                  required
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>

              <hr className={modalStyles.separador} />
              <div className={modalStyles.formGroupFullWidth}>
                <label htmlFor="edit_endereco">
                  <b>Endereço*</b>
                </label>
                <input
                  id="edit_endereco"
                  name="endereco"
                  value={editForm.endereco}
                  onChange={handleEditChange}
                  required
                  placeholder="Rua da Água"
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_numero">
                  <b>Número*</b>
                </label>
                <input
                  id="edit_numero"
                  name="numero"
                  type="number"
                  value={editForm.numero}
                  onChange={handleEditChange}
                  required
                  placeholder="2015"
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="edit_complemento">
                  <b>Complemento</b>
                </label>
                <input
                  id="edit_complemento"
                  name="complemento"
                  value={editForm.complemento}
                  onChange={handleEditChange}
                  placeholder="Ap 307"
                />
              </div>
              <div className={modalStyles.formGroupFullWidth}>
                <label htmlFor="edit_bairro">
                  <b>Bairro*</b>
                </label>
                <input
                  id="edit_bairro"
                  name="bairro"
                  value={editForm.bairro}
                  onChange={handleEditChange}
                  required
                  placeholder="Centro"
                />
              </div>
              <div className={modalStyles.formGroupFullWidth}>
                <label htmlFor="edit_pontoReferencia">
                  <b>Ponto de referência</b>
                </label>
                <input
                  id="edit_pontoReferencia"
                  name="pontoReferencia"
                  value={editForm.pontoReferencia}
                  onChange={handleEditChange}
                  placeholder="Em frente ao parque"
                />
              </div>
              <div className={modalStyles.modalButtonGroup}>
                <button
                  type="button"
                  onClick={closeEditModal}
                  style={{ background: "#aaa", color: "#fff" }}
                >
                  Cancelar
                </button>
                <button type="submit" disabled={editLoading}>
                  {editLoading ? "Salvando..." : "Salvar Alterações"}
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
