import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/not_found.css";
export default function NotFound404() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <div className="content">
        <div className="errorCode">404</div>
        <h1 className="title">Oops! Página no encontrada</h1>
        <button onClick={() => navigate("/")} className="button">
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
}
