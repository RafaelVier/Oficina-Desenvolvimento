"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import authService from "../services/authService";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Formatação específica para CPF
    if (name === "cpf") {
      // Remove tudo que não é número
      const cpfLimpo = value.replace(/\D/g, "");
      // Limita a 11 dígitos
      const cpfFormatado = cpfLimpo.slice(0, 11);
      setFormData({ ...formData, cpf: cpfFormatado });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validações básicas
    if (!formData.cpf || !formData.senha) {
      setError("Por favor, preencha CPF e senha.");
      setLoading(false);
      return;
    }

    // Validação de CPF (11 dígitos)
    const cpfLimpo = formData.cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      setError("CPF deve conter 11 dígitos.");
      setLoading(false);
      return;
    }

    // Validação de senha (mínimo 6 caracteres)
    if (formData.senha.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      // Tentar autenticar via API
      const voluntario = await authService.autenticarVoluntario(
        formData.cpf,
        formData.senha
      );

      console.log("Login realizado com sucesso para:", voluntario.person.name);
      alert(`Bem-vindo(a), ${voluntario.person.name}!`);

      // Redirecionar para home
      window.location.href = "/home";

      /* === CÓDIGO MOCK COMENTADO PARA REFERÊNCIA ===
      // Versão anterior com senha fixa
      if (formData.senha !== "1234") {
        setError("Usuário ou senha incorretos.");
      } else {
        alert("Login realizado com sucesso!");
        window.location.href = "/home";
      }
      === FIM DO CÓDIGO MOCK === */
    } catch (err) {
      console.error("Erro no login:", err);
      setError(err.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.loginBox}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo-sanem.svg"
              alt="Logo SANEM"
              width={120}
              height={120}
              className={styles.logo}
            />
          </div>
          <h2 className={styles.loginTitle}>Login do Voluntário</h2>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="cpf"
              placeholder="CPF (apenas números)"
              className={styles.input}
              value={formData.cpf}
              onChange={handleChange}
              maxLength={11}
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              className={styles.input}
              value={formData.senha}
              onChange={handleChange}
              minLength={6}
              required
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Entrando..." : "Login"}
            </button>
          </form>
          {error && <div className={styles.errorMsg}>{error}</div>}
          <a href="#" className={styles.forgot}>
            Esqueci minha senha
          </a>
        </div>
      </div>
    </>
  );
}
