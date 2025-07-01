"use client";
import React, { useState } from "react";
import MenuBar from "../components/menubar/menubar";
import Navegation from "../components/navegation/navegation";
import { useRouter } from "next/navigation";
import styles from "./cadastrovoluntario.module.css";
import voluntarioService from "../../services/voluntarioService";

const CadastroVoluntario = () => {
  const [form, setForm] = useState({
    // === DADOS MOCK PARA DESENVOLVIMENTO ===
    // Remover ou limpar estes valores em produção
    nomeCompleto: "Carlos Eduardo Lima",
    telefoneCelular: "(45) 97777-6666",
    email: "carlos.lima@email.com",
    cpf: "11122233344",
    endereco: "Rua das Palmeiras, 789",
    bairro: "Jardim América",
    numero: "789",
    complemento: "Bloco A",
    pontoReferencia: "Próximo à escola municipal",
    senha: "",
    confirmarSenha: "",

    /* === VALORES PARA PRODUÇÃO (descomente para usar) ===
    nomeCompleto: "",
    telefoneCelular: "",
    email: "",
    cpf: "",
    endereco: "",
    bairro: "",
    numero: "",
    complemento: "",
    pontoReferencia: "",
    senha: "",
    confirmarSenha: "",
    === */
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const cpfLimpo = form.cpf.replace(/\D/g, "");
    const telefoneLimpo = form.telefoneCelular.replace(/\D/g, "");

    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      return "Telefone deve conter entre 10 e 11 dígitos (incluindo DDD).";
    }

    if (cpfLimpo.length !== 11) {
      return "CPF deve conter 11 dígitos numéricos.";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Por favor, insira um e-mail válido.";
    }

    if (form.senha.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres.";
    }

    if (form.senha !== form.confirmarSenha) {
      return "A senha e confirmação de senha devem ser iguais.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validações
    const cpfLimpo = form.cpf.replace(/\D/g, "");
    const telefoneLimpo = form.telefoneCelular.replace(/\D/g, "");

    // Validação de telefone
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      setError("Telefone deve conter entre 10 e 11 dígitos (incluindo DDD).");
      setLoading(false);
      return;
    }

    // Validação de CPF
    if (cpfLimpo.length !== 11) {
      setError("CPF deve conter 11 dígitos numéricos.");
      setLoading(false);
      return;
    }

    // Validação de email
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Por favor, insira um e-mail válido.");
      setLoading(false);
      return;
    }

    // Validação de senha
    if (form.senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    // Validação de confirmação de senha
    if (form.senha !== form.confirmarSenha) {
      setError("A senha e confirmação de senha devem ser iguais.");
      setLoading(false);
      return;
    }

    try {
      // Preparar dados para envio à API (pessoa + voluntário)
      const dadosCompletos = {
        nomeCompleto: form.nomeCompleto.trim(),
        telefoneCelular: form.telefoneCelular.trim(),
        email: form.email.trim(),
        cpf: cpfLimpo, // CPF limpo (somente números)
        endereco: form.endereco.trim(),
        bairro: form.bairro.trim(),
        numero: form.numero.toString(),
        complemento: form.complemento.trim() || "N/A", // Backend exige campo não vazio
        pontoReferencia: form.pontoReferencia.trim() || "N/A", // Backend exige campo não vazio
        password: form.senha, // Senha do voluntário
        isActive: true, // Novos voluntários são ativos por padrão
      };

      console.log("Enviando dados para API:", {
        ...dadosCompletos,
        password: "***",
      });

      // Chamar o serviço para cadastrar pessoa + voluntário na API
      const resultado = await voluntarioService.cadastrarVoluntarioCompleto(
        dadosCompletos
      );

      console.log("Voluntário cadastrado com sucesso:", resultado);

      // Limpar formulário após sucesso
      setForm({
        nomeCompleto: "",
        telefoneCelular: "",
        email: "",
        cpf: "",
        endereco: "",
        bairro: "",
        numero: "",
        complemento: "",
        pontoReferencia: "",
        senha: "",
        confirmarSenha: "",
      });

      alert("Voluntário cadastrado com sucesso!");
      router.push("/sucesso?tipo=voluntarios");

      /* === CÓDIGO MOCK COMENTADO PARA REFERÊNCIA ===
      // Versão anterior usando localStorage (mock)
      const novoVoluntario = {
        id: Date.now(),
        nomeCompleto: form.nomeCompleto,
        telefoneCelular: form.telefoneCelular,
        email: form.email,
        cpf: cpfLimpo,
        endereco: form.endereco,
        bairro: form.bairro,
        numero: form.numero,
        complemento: form.complemento,
        pontoReferencia: form.pontoReferencia,
      };
      const voluntarios = JSON.parse(
        localStorage.getItem("mockVoluntarios") || "[]"
      );
      voluntarios.push(novoVoluntario);
      localStorage.setItem("mockVoluntarios", JSON.stringify(voluntarios));
      === FIM DO CÓDIGO MOCK ===*/
    } catch (err) {
      console.error("Erro detalhado:", err);

      // Tratamento de erro mais específico
      let mensagemErro = "Erro ao cadastrar voluntário";

      if (err.response?.data?.message) {
        mensagemErro = err.response.data.message;
      } else if (err.response?.status === 400) {
        mensagemErro = "Dados inválidos. Verifique os campos preenchidos.";
      } else if (err.response?.status === 409) {
        mensagemErro = "CPF já cadastrado no sistema.";
      } else if (err.response?.status >= 500) {
        mensagemErro = "Erro interno do servidor. Tente novamente mais tarde.";
      } else if (err.message) {
        mensagemErro = err.message;
      }

      setError(mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.containerGeral}>
      <MenuBar />
      <Navegation />
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.titulo}>Cadastro de Voluntário</h1>
          <div className={styles.decoracao}></div>
          <form onSubmit={handleSubmit} className={styles.formulario}>
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
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="fulano@gmail.com"
              />
            </div>
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
              <label htmlFor="cpf">
                <b>CPF*</b>
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                pattern="[0-9]*"
                maxLength={11}
                value={form.cpf}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, cpf: onlyNums });
                }}
                placeholder="11122233355"
                required
              />
            </div>

            {/* Campos de senha específicos para voluntário */}
            <div className={styles.formGroup}>
              <label htmlFor="senha">
                <b>Senha*</b>
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                value={form.senha}
                onChange={handleChange}
                required
                placeholder="Mínimo 6 caracteres"
                minLength={6}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmarSenha">
                <b>Confirmar Senha*</b>
              </label>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={form.confirmarSenha}
                onChange={handleChange}
                required
                placeholder="Repita a senha"
                minLength={6}
              />
            </div>

            <hr className={styles.separador} />
            <div className={styles.formGroupFullWidth}>
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
              </label>
              <input
                id="complemento"
                name="complemento"
                value={form.complemento}
                onChange={handleChange}
                placeholder="Ap 307"
              />
            </div>
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
              </label>
              <input
                id="pontoReferencia"
                name="pontoReferencia"
                value={form.pontoReferencia}
                onChange={handleChange}
                placeholder="Em frente ao parque"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar Voluntário"}
            </button>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroVoluntario;
