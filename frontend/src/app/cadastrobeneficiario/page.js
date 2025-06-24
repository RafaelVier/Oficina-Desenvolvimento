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
    email: "",
    cpfCrnm: "",
    nif: "",
    endereco: "",
    bairro: "",
    numero: "",
    complemento: "",
    pontoReferencia: ""
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
    
    // Validação: NIF obrigatório
    const cpfCrnmLimpo = form.cpfCrnm.replace(/\D/g, "");
    const nifLimpo = form.nif.replace(/\D/g, "");
    
    if (!nifLimpo) {
      setError("O campo NIF é obrigatório.");
      setLoading(false);
      return;
    }
    
    // Se CPF/CRNM foi preenchido, validar formato (11 dígitos para CPF)
    if (cpfCrnmLimpo.length > 0 && cpfCrnmLimpo.length !== 11) {
      setError("CPF deve conter 11 dígitos numéricos.");
      setLoading(false);
      return;
    }
    
    try {
      // Montar objeto de endereço (sem id, não é array)
      const address = {
        number: Number(form.numero) || 0,
        street: form.endereco,
        neighborhood: form.bairro,
        complement: form.complemento || "",
        referencePoint: form.pontoReferencia || ""
      };
      if (!address.number) {
        setError("Preencha o número do endereço corretamente.");
        setLoading(false);
        return;
      }
      console.log("[DEBUG] address enviado:", address);
      // POST endereço
      const addressRes = await fetch("http://localhost:8080/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address)
      });
      const addressData = await addressRes.json();
      console.log("[DEBUG] addressRes status:", addressRes.status);
      console.log("[DEBUG] addressRes body:", addressData);
      if (!addressRes.ok) throw new Error("Erro ao cadastrar endereço: " + JSON.stringify(addressData));
      const addressId = addressData.id;
      
      // Montar objeto pessoa
      const pessoa = {
        name: form.nomeCompleto,
        phone: form.telefoneCelular,
        email: form.email,
        cpf: cpfCrnmLimpo.length > 0 ? cpfCrnmLimpo : null,
        idAddress: addressId
      };
      console.log("[DEBUG] pessoa enviada:", pessoa);
      // POST pessoa
      const peopleRes = await fetch("http://localhost:8080/api/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pessoa)
      });
      const peopleData = await peopleRes.json();
      console.log("[DEBUG] peopleRes status:", peopleRes.status);
      console.log("[DEBUG] peopleRes body:", peopleData);
      if (!peopleRes.ok) throw new Error("Erro ao cadastrar pessoa: " + JSON.stringify(peopleData));
      
      // POST para /api/receivers usando o personId
      const receiver = {
        personId: peopleData.id,
        isFit: true, // Valor padrão, pode ser ajustado conforme necessário
        nif: nifLimpo.length > 0 ? nifLimpo : null
      };
      console.log("[DEBUG] receiver enviado:", receiver);
      const receiverRes = await fetch("http://localhost:8080/api/receivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receiver)
      });
      const receiverData = await receiverRes.json();
      console.log("[DEBUG] receiverRes status:", receiverRes.status);
      console.log("[DEBUG] receiverRes body:", receiverData);
      if (!receiverRes.ok) throw new Error("Erro ao cadastrar beneficiário: " + JSON.stringify(receiverData));
      
      router.push("/sucesso");
    } catch (err) {
      setError(err.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

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
          <label><b>E-mail*</b><br/>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}}
              placeholder="fulano@email.com"
            />
          </label>
          <label><b>CPF/CRNM (opcional se NIF for preenchido)</b><br/>
            <input
              name="cpfCrnm"
              type="text"
              pattern="[0-9]{11}"
              maxLength={11}
              value={form.cpfCrnm}
              onChange={e => {
                // Aceita apenas números
                const onlyNums = e.target.value.replace(/\D/g, "");
                setForm({ ...form, cpfCrnm: onlyNums });
              }}
              style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}}
              placeholder="11122233355"
            />
          </label>
          <label><b>NIF*</b><br/>
            <input
              name="nif"
              type="text"
              value={form.nif}
              onChange={e => {
                // Aceita apenas números
                const onlyNums = e.target.value.replace(/\D/g, "");
                setForm({ ...form, nif: onlyNums });
              }}
              required
              style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}}
              placeholder="123456789"
            />
          </label>
          <label><b>Endereço*</b><br/>
            <input name="endereco" value={form.endereco} onChange={handleChange} required style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="Rua da Água" />
          </label>
          <label><b>Bairro (endereço)*</b><br/>
            <input name="bairro" value={form.bairro} onChange={handleChange} required style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="Centro" />
          </label>
          <label><b>Número (endereço)*</b><br/>
            <input
              name="numero"
              type="number"
              value={form.numero}
              onChange={handleChange}
              required
              style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}}
              placeholder="2015"
            />
          </label>
          <label><b>Complemento (endereço)*</b><br/>
            <input name="complemento" value={form.complemento} onChange={handleChange} required style={{width: "100%", marginBottom: 16, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="Ap 307" />
          </label>
          <label><b>Ponto de referência (endereço)*</b><br/>
            <input name="pontoReferencia" value={form.pontoReferencia} onChange={handleChange} required style={{width: "100%", marginBottom: 24, padding: 8, borderRadius: 6, border: "2px solid #2d253c"}} placeholder="Em frente ao parque" />
          </label>
          <button type="submit" disabled={loading} style={{width: "100%", background: "#1976d2", color: "#fff", padding: 10, borderRadius: 6, border: "none", fontWeight: 600, fontSize: 16}}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CadastroBeneficiario;  