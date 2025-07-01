"use client";
import styles from "./menuBar.module.css";
import Image from "next/image";
import authService from "../../../services/authService";
import { useState, useEffect, useRef } from "react";

export default function MenuBar({ hasNotification, voluntario }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair do sistema?")) {
      authService.logout();
      window.location.href = "/";
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const formatCPF = (cpf) => {
    if (!cpf) return "Não informado";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (phone) => {
    if (!phone) return "Não informado";
    return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  };

  const formatAddress = (address) => {
    if (!address) return "Não informado";

    const { street, number, neighborhood, complement } = address;
    let addressString = `${street}, ${number}`;

    if (complement && complement !== "N/A") {
      addressString += ` - ${complement}`;
    }

    addressString += ` - ${neighborhood}`;

    return addressString;
  };

  return (
    <header className={styles.menuBar}>
      <div className={styles.rightSection}>
        <div
          className={styles.userInfo}
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          <UserIcon />
          <span className={styles.userName}>
            {voluntario?.person?.name || "Voluntário"}
          </span>
          <span className={styles.arrowDown}>▼</span>

          {showDropdown && (
            <div className={styles.userDropdown}>
              {/* Cabeçalho do perfil */}
              <div className={styles.userProfile}>
                <div className={styles.userAvatar}>
                  {voluntario?.person?.name?.charAt(0).toUpperCase() || "V"}
                </div>
                <div className={styles.userDetails}>
                  <h3>{voluntario?.person?.name || "Nome não informado"}</h3>
                  <p>Voluntário</p>
                </div>
              </div>

              {/* Informações detalhadas */}
              <div className={styles.userDetailsInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>CPF:</span>
                  <span className={styles.infoValue}>
                    {formatCPF(voluntario?.person?.cpf)}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Email:</span>
                  <span className={styles.infoValue}>
                    {voluntario?.person?.email || "Não informado"}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Telefone:</span>
                  <span className={styles.infoValue}>
                    {formatPhone(voluntario?.person?.phone)}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Endereço:</span>
                  <span className={styles.infoValue}>
                    {formatAddress(voluntario?.person?.address)}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Status:</span>
                  <span
                    className={`${styles.statusBadge} ${
                      voluntario?.active
                        ? styles.statusActive
                        : styles.statusInactive
                    }`}
                  >
                    {voluntario?.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>

              {/* Ações do dropdown */}
              <div className={styles.dropdownActions}>
                <button
                  className={`${styles.actionButton} ${styles.logoutButton}`}
                  onClick={handleLogout}
                >
                  Sair do Sistema
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={styles.iconWrapper}
          style={{ position: "relative" }}
        ></div>
      </div>
    </header>
  );
}

function UserIcon() {
  return (
    <Image
      src="/user-icon.png"
      alt="User"
      width={24}
      height={24}
      style={{ marginRight: 12 }}
    />
  );
}

function LogoutIcon() {
  return (
    <Image
      src="/logout-icon.png"
      alt="Logout"
      width={24}
      height={24}
      style={{ marginRight: 12 }}
    />
  );
}
