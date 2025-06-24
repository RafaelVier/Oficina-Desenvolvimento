import Navigation from '../components/navegation/navegation';
import Link from 'next/link';

export default function Sucesso() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      background: "#f7f7fa"
    }}>
      <Navigation />
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }}>
        <div style={{
          background: "#fff",
          padding: "48px 64px",
          borderRadius: "20px",
          border: "1.5px solid #e5e7eb",
          fontSize: "2rem",
          fontWeight: "700",
          color: "#1976d2",
          textAlign: "center",
          boxShadow: "0 4px 24px rgba(25, 118, 210, 0.08)",
          marginBottom: 32
        }}>
          Cadastro feito com sucesso!
        </div>
        <Link href="/home" style={{
          display: "inline-block",
          background: "#1976d2",
          color: "#fff",
          padding: "16px 40px",
          borderRadius: "12px",
          fontWeight: 700,
          fontSize: "1.2rem",
          textDecoration: "none",
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
          transition: "background 0.2s",
          marginTop: 8
        }}>
          Voltar ao Menu
        </Link>
      </div>
    </div>
  );
} 