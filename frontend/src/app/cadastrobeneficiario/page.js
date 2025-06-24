"use client";
import React, { useState } from "react";
import MenuBar from "../components/menubar/menubar";
import Navegation from "../components/navegation/navegation";
import { useRouter } from "next/navigation";
import styles from "./cadastrobeneficiario.module.css";

const CadastroBeneficiario = () => {
  const [form, setForm] = useState({
    nomeCompleto: "",
    telefoneCelular: "",
    cpfCrnm: "",
    endereco: "",
    bairro: "",
    numero: "",
    complemento: "",
    pontoReferencia: ""
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simula o POST e mostra o mock no console
    console.log("Dados enviados:", form);
    router.push("/sucesso");
  };

  return (
    <div className={styles.containerGeral}>
      <MenuBar />
      <Navegation />
      <div className={styles.formContainer}>
        <h1 className={styles.titulo}>Cadastro de Beneficiário</h1>
        <div className={styles.decoracao}></div>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <label><b>Nome completo*</b><br/>
            <input name="nomeCompleto" value={form.nomeCompleto} onChange={handleChange} required style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="Fulano da Silva" />
          </label>
          <label><b>Telefone celular*</b><br/>
            <input name="telefoneCelular" value={form.telefoneCelular} onChange={handleChange} required style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="(45) 9 9988-7766" />
          </label>
          <label><b>CPF/CRNM*</b><br/>
            <input name="cpfCrnm" value={form.cpfCrnm} onChange={handleChange} required style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="111.222.333-44" />
          </label>
          <label><b>Endereço*</b><br/>
            <input name="endereco" value={form.endereco} onChange={handleChange} required style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="Rua da Água" />
          </label>
          <label><b>Bairro (endereço)*</b><br/>
            <input name="bairro" value={form.bairro} onChange={handleChange} required style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="Centro" />
          </label>
          <label><b>Número (endereço)</b><br/>
            <input name="numero" value={form.numero} onChange={handleChange} style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="2015" />
          </label>
          <label><b>Complemento (endereço)</b><br/>
            <input name="complemento" value={form.complemento} onChange={handleChange} style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="Ap 307" />
          </label>
          <label><b>Ponto de referência (endereço)</b><br/>
            <input name="pontoReferencia" value={form.pontoReferencia} onChange={handleChange} style={{width: "100%", marginBottom: 24, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="Em frente ao parque" />
          </label>
          <button type="submit" style={{width: "100%", background: "#1976d2", color: "#fff", padding: 10, borderRadius: 6, border: "none", fontWeight: 600, fontSize: 16}}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroBeneficiario;  