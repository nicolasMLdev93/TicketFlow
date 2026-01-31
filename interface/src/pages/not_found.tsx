import { useNavigate } from "react-router-dom";

export default function NotFound404() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.errorCode}>404</div>
        <h1 style={styles.title}>Oops! Página no encontrada</h1>
        <button onClick={() => navigate("/")} style={styles.button}>
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #252627 0%, #323132 100%)",
    padding: "20px",
  },
  content: {
    textAlign: "center" as const,
    color: "white",
    maxWidth: "400px",
  },
  errorCode: {
    fontSize: "100px",
    fontWeight: "bold" as const,
    marginBottom: "10px",
    opacity: 0.9,
  },
  title: {
    fontSize: "24px",
    marginBottom: "30px",
    fontWeight: "normal" as const,
  },
  button: {
    background: "white",
    color: "#252425",
    border: "none",
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold" as const,
    transition: "0.3s",
  },
};
