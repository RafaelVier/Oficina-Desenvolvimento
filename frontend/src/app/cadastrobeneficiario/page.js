"use client";
import React, { useState } from "react";
import MenuBar from "../components/menubar/menubar";
import Navegation from "../components/navegation/navegation";
import { useRouter } from "next/navigation";
import styles from "./cadastrobeneficiario.module.css";
import beneficiarioService from "../../services/beneficiarioService";

const CadastroBeneficiario = () => {
  // Usando dados do mock como valores iniciais (comentados para produção)
  const [form, setForm] = useState({
    // === DADOS MOCK PARA DESENVOLVIMENTO ===
    // Remover ou limpar estes valores em produção
    nomeCompleto: "Maria dos Santos Silva",
    telefoneCelular: "(45) 98888-7777",
    email: "maria.santos@email.com",
    cpfCrnm: "98765432100",
    nif: "123456789",
    endereco: "Avenida Principal, 456",
    bairro: "Vila Nova",
    numero: "456",
    complemento: "Casa 02",
    pontoReferencia: "Próximo ao posto de saúde",

    /* === VALORES PARA PRODUÇÃO (descomente para usar) ===
    nomeCompleto: "",
    telefoneCelular: "",
    email: "",
    cpfCrnm: "",
    nif: "",
    endereco: "",
    bairro: "",
    numero: "",
    complemento: "",
    pontoReferencia: "",
    === */
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validação: pelo menos um dos campos (CPF/CRNM ou NIF) deve ser preenchido
    const cpfCrnmLimpo = form.cpfCrnm.replace(/\D/g, "");
    const nifLimpo = form.nif.replace(/\D/g, "");

    if (cpfCrnmLimpo.length === 0 && nifLimpo.length === 0) {
      setError(
        "É obrigatório preencher pelo menos um dos campos: CPF/CRNM ou NIF."
      );
      setLoading(false);
      return;
    }

    // Se CPF/CRNM foi preenchido, validar formato (11 dígitos para CPF)
    if (cpfCrnmLimpo.length > 0 && cpfCrnmLimpo.length !== 11) {
      setError("CPF/CRNM deve conter 11 dígitos numéricos.");
      setLoading(false);
      return;
    }

    // Validação de email (regex simples)
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Por favor, insira um e-mail válido.");
      setLoading(false);
      return;
    }

    try {
      // Preparar dados para envio à API (pessoa + beneficiário)
      const dadosCompletos = {
        nomeCompleto: form.nomeCompleto.trim(),
        telefoneCelular: form.telefoneCelular.trim(),
        email: form.email.trim(),
        cpfCrnm: cpfCrnmLimpo, // CPF limpo (somente números)
        nif: nifLimpo || null, // NIF limpo ou null se vazio
        endereco: form.endereco.trim(),
        bairro: form.bairro.trim(),
        numero: form.numero.toString(),
        complemento: form.complemento.trim() || "N/A", // Backend exige campo não vazio
        pontoReferencia: form.pontoReferencia.trim() || "N/A", // Backend exige campo não vazio
        isFit: true, // Assumindo que novos beneficiários são aptos por padrão
      };

      console.log("Enviando dados para API:", dadosCompletos);

      // Chamar o serviço para cadastrar pessoa + beneficiário na API
      const resultado = await beneficiarioService.cadastrarBeneficiarioCompleto(
        dadosCompletos
      );

      console.log("Beneficiário cadastrado com sucesso:", resultado);

      // Limpar formulário após sucesso
      setForm({
        nomeCompleto: "",
        telefoneCelular: "",
        email: "",
        cpfCrnm: "",
        nif: "",
        endereco: "",
        bairro: "",
        numero: "",
        complemento: "",
        pontoReferencia: "",
      });

      alert("Beneficiário cadastrado com sucesso!");
      router.push("/sucesso?tipo=beneficiarios");

      /* === CÓDIGO MOCK COMENTADO PARA REFERÊNCIA ===
      // Versão anterior usando localStorage (mock)
      const novoBeneficiario = {
        id: Date.now(),
        nomeCompleto: form.nomeCompleto,
        telefoneCelular: form.telefoneCelular,
        email: form.email,
        cpfCrnm: cpfCrnmLimpo,
        nif: nifLimpo,
        endereco: form.endereco,
        bairro: form.bairro,
        numero: form.numero,
        complemento: form.complemento,
        pontoReferencia: form.pontoReferencia,
      };
      const beneficiarios = JSON.parse(
        localStorage.getItem("mockBeneficiarios") || "[]"
      );
      beneficiarios.push(novoBeneficiario);
      localStorage.setItem("mockBeneficiarios", JSON.stringify(beneficiarios));
      === FIM DO CÓDIGO MOCK ===*/
    } catch (err) {
      console.error("Erro detalhado:", err);

      // Tratamento de erro mais específico
      let mensagemErro = "Erro ao cadastrar beneficiário";

      if (err.response?.data?.message) {
        mensagemErro = err.response.data.message;
      } else if (err.response?.status === 400) {
        mensagemErro = "Dados inválidos. Verifique os campos preenchidos.";
      } else if (err.response?.status === 409) {
        mensagemErro = "CPF ou NIF já cadastrado no sistema.";
      } else if (err.response?.status >= 500) {
        mensagemErro = "Erro interno do servidor. Tente novamente mais tarde.";
      } else if (err.message) {
        mensagemErro = err.message;
      }

      setError(mensagemErro);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.containerGeral}>
      <MenuBar />
      <Navegation />
      <div className={styles.formWrapper}>
        {" "}
        {/* Novo wrapper para centralização e largura */}
        <div className={styles.formContainer}>
          <h1 className={styles.titulo}>Cadastro de Beneficiário</h1>
          <div className={styles.decoracao}></div>
          <form onSubmit={handleSubmit} className={styles.formulario}>
            {/* Linha Nome e E-mail */}
            <div className={styles.formGroup}>
              <label htmlFor="nomeCompleto">
                <b>Nome completo*</b>
              </label>
              <input
                id="nomeCompleto"
                name="nomeCompleto"
                value={form.nomeCompleto}
                onChange={handleChange}
                required
                placeholder="Fulano da Silva"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">
                <b>E-mail*</b>
              </label>
              <input
                id="email"
                name="email"
                type="email" // Usar type="email" para validação básica de navegador
                value={form.email}
                onChange={handleChange}
                required
                placeholder="fulano@gmail.com"
              />
            </div>

            {/* Linha Telefone, CPF/CRNM, NIF */}
            <div className={styles.formGroup}>
              <label htmlFor="telefoneCelular">
                <b>Telefone*</b>
              </label>
              <input
                id="telefoneCelular"
                name="telefoneCelular"
                value={form.telefoneCelular}
                onChange={handleChange}
                required
                placeholder="(45) 9 9988-7766"
                type="tel"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cpfCrnm">
                <b>CPF/CRNM (opcional se NIF for preenchido)</b>
              </label>
              <input
                id="cpfCrnm"
                name="cpfCrnm"
                type="text"
                pattern="[0-9]*" // Permite apenas números
                maxLength={11}
                value={form.cpfCrnm}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, cpfCrnm: onlyNums });
                }}
                placeholder="11122233355"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="nif">
                <b>NIF (opcional se CPF/CRNM for preenchido)</b>
              </label>
              <input
                id="nif"
                name="nif"
                type="text"
                pattern="[0-9]*" // Permite apenas números
                value={form.nif}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, nif: onlyNums });
                }}
                placeholder="123456789"
              />
            </div>

            <hr className={styles.separador} />

            {/* Linha Endereço, Número, Complemento */}
            <div className={styles.formGroupFullWidth}>
              {" "}
              {/* Ocupa a largura total da linha */}
              <label htmlFor="endereco">
                <b>Endereço*</b>
              </label>
              <input
                id="endereco"
                name="endereco"
                value={form.endereco}
                onChange={handleChange}
                required
                placeholder="Rua da Água"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numero">
                <b>Número*</b>
              </label>
              <input
                id="numero"
                name="numero"
                type="number"
                value={form.numero}
                onChange={handleChange}
                required
                placeholder="2015"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="complemento">
                <b>Complemento</b>
              </label>{" "}
              {/* Tornando Complemento opcional */}
              <input
                id="complemento"
                name="complemento"
                value={form.complemento}
                onChange={handleChange}
                placeholder="Ap 307"
              />
            </div>

            {/* Linha Bairro, Ponto de Referência */}
            <div className={styles.formGroupFullWidth}>
              <label htmlFor="bairro">
                <b>Bairro*</b>
              </label>
              <input
                id="bairro"
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
                required
                placeholder="Centro"
              />
            </div>
            <div className={styles.formGroupFullWidth}>
              <label htmlFor="pontoReferencia">
                <b>Ponto de referência</b>
              </label>{" "}
              {/* Tornando Ponto de Referência opcional */}
              <input
                id="pontoReferencia"
                name="pontoReferencia"
                value={form.pontoReferencia}
                onChange={handleChange}
                placeholder="Em frente ao parque"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar Beneficiário"}
            </button>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroBeneficiario;
