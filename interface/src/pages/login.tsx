import { useState } from "react";
import Footer from "../components/footer";
import "../styles/login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"success" | "error">("error");
  const [showCredentialsModal, setShowCredentialsModal] =
    useState<boolean>(false);

  const handleChange = (event): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClean = (): void => {
    setFormData({
      email: "",
      password: "",
    });
    setEmailError("");
  };

  const showModalMessage = (
    message: string,
    type: "success" | "error" = "error",
  ): void => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Por favor, completa todos los campos");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, introduce un email válido");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    setEmailError("");
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showModalMessage("¡Bienvenido!", "success");
        localStorage.setItem("token", data.token);
        handleClean();
      } else {
        setErrorMessage(data.error);
        showModalMessage(data.error);
        handleClean();
      }
    } catch (error) {
      showModalMessage(
        "Error de conexión. Inténtalo de nuevo más tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = (): void => {
    setShowModal(false);
    setModalMessage("");
  };

  const closeCredentialsModal = (): void => {
    setShowCredentialsModal(false);
  };

  const fillCredentials = (): void => {
    setFormData({
      email: "nicolasbauza21@gmail.com",
      password: "Contraseña1234",
    });
    setShowCredentialsModal(false);
  };

  const openCredentialsModal = (): void => {
    setShowCredentialsModal(true);
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Iniciar Sesión</h2>
            <p>Ingresa tus credenciales para acceder</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                className={`form-input ${emailError ? "input-error" : ""}`}
                placeholder="ejemplo@correo.com"
                value={formData.email}
                required
              />
              {emailError && (
                <div className="email-error-message">
                  <span className="error-icon">⚠️</span>
                  {emailError}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                required
              />
            </div>

            {errorMessage && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>

            <div className="login-footer">
              <a href="/forgot-password" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
              <p className="signup-link">
                ¿No tienes una cuenta? <a href="/signup">Regístrate</a>
              </p>
            </div>

            <div className="credentials-section">
              <button
                type="button"
                className="credentials-button"
                onClick={openCredentialsModal}
              >
                Credenciales de Prueba
              </button>
            </div>
          </form>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              <div className={`modal-icon ${modalType}`}>
                {modalType === "success" ? "✓" : "✗"}
              </div>
              <h3 className="modal-title">
                {modalType === "success" ? "¡Éxito!" : "Error"}
              </h3>
              <p className="modal-message">{modalMessage}</p>
              <button
                className={`modal-button ${modalType}`}
                onClick={closeModal}
              >
                Aceptar
              </button>
            </div>
          </div>
        )}

        {showCredentialsModal && (
          <div className="modal-overlay" onClick={closeCredentialsModal}>
            <div
              className="modal-content credentials-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeCredentialsModal}>
                ×
              </button>
              <div className="modal-icon info">🔑</div>
              <h3 className="modal-title">Credenciales de Prueba</h3>
              <div className="credentials-info">
                <div className="credential-item">
                  <strong>Email:</strong>
                  <code className="credential-value">
                    nicolasbauza21@gmail.com
                  </code>
                </div>
                <div className="credential-item">
                  <strong>Password:</strong>
                  <code className="credential-value">Contraseña1234</code>
                </div>
              </div>
              <p className="modal-message">
                Estas credenciales se auto-rellenarán en el formulario.
              </p>
              <div className="modal-buttons">
                <button
                  className="modal-button success"
                  onClick={fillCredentials}
                >
                  Usar Credenciales
                </button>
                <button
                  className="modal-button secondary"
                  onClick={closeCredentialsModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
