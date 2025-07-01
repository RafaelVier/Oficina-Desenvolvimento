"use client";
import React, { useState } from "react";
import MenuBar from "../components/menubar/menubar";
import Navegation from "../components/navegation/navegation";
import { useRouter } from "next/navigation";
import styles from "./cadastrodoador.module.css";
import doadorService from "../../services/doadorService";

const CadastroDoador = () => {
  const [form, setForm] = useState({
    nomeCompleto: "João da Silva Santos",
    telefoneCelular: "(45) 99999-8888",
    email: "joao.silva@email.com",
    cpf: "12345678901",
    endereco: "Rua das Flores, 123",
    bairro: "Centro",
    numero: "123",
    complemento: "Apto 45",
    pontoReferencia: "Próximo ao banco Itaú",
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

    // Limpa o CPF para garantir que só vai número
    const cpfLimpo = form.cpf.replace(/\D/g, "");

    if (cpfLimpo.length > 0 && cpfLimpo.length !== 11) {
      setError("CPF deve conter 11 dígitos numéricos.");
      setLoading(false);
      return;
    }

    // Validação de email simples
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Por favor, insira um e-mail válido.");
      setLoading(false);
      return;
    }

    try {
      // Preparar dados para envio à API
      const dadosDoador = {
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

      // Chamar o serviço para cadastrar na API
      const resultado = await doadorService.cadastrarDoador(dadosDoador);

      console.log("Doador cadastrado com sucesso:", resultado);

      // Limpar formulário
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
      });

      alert("Doador cadastrado com sucesso!");
      router.push("/sucesso?tipo=doadores");

      /* === CÓDIGO MOCK COMENTADO PARA REFERÊNCIA ===
      // Versão anterior usando localStorage (mock)
      const novoDoador = {
        id: Date.now(),
        nomeCompleto: form.nomeCompleto,
        telefoneCelular: form.telefoneCelular,
        email: form.email,
        cpf: cpfLimpo,
        endereco: form.endereco,
        bairro: form.bairro,
        numero: form.numero,
        complemento: form.complemento,
        pontoReferencia: form.pontoReferencia
      };
      // Salva no localStorage
      const doadores = JSON.parse(localStorage.getItem('mockDoadores') || '[]');
      doadores.push(novoDoador);
      localStorage.setItem('mockDoadores', JSON.stringify(doadores));
      === FIM DO CÓDIGO MOCK === */
    } catch (err) {
      console.error("Erro ao cadastrar doador:", err);
      setError(err.message || "Erro ao cadastrar doador");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.containerGeral}>
      <MenuBar />
      <Navegation />
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.titulo}>Cadastro de Doador</h1>
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
              {loading ? "Cadastrando..." : "Cadastrar Doador"}
            </button>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroDoador;
