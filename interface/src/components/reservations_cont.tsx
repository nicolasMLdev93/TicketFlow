import "../styles/reservations_cont.css";
import get_ticketsByUser from "../connections/get_ticketsByUser";
import { useState, useEffect } from "react";
import type { Tickets } from "../types/interfaces";
import eventosArray from "../data/events";

export default function Reservations_cont() {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    const userId = Number(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token");

    if (token && userId) {
      setLoading(true);
      get_ticketsByUser(userId)
        .then((res) => {
          if (Array.isArray(res)) {
            setTickets(res);
          } else {
            setTickets([]);
          }
          setError(null);
        })
        .catch((err) => {
          setTickets([]);
          setError("Error al cargar las reservas");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const get_eventTitle = (id: number): string => {
    const result = eventosArray.find(
      (event) =>
        event.ticket_type_id[0] === id || event.ticket_type_id[1] === id,
    );
    return result ? result.title : "";
  };

  const handleDeleteClick = (ticket_id: number): void => {
    setTicketToDelete(ticket_id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (!ticketToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/cancel_ticket/${ticketToDelete}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (response.ok) {
        const updatedTickets = tickets.map((ticket) =>
          ticket.id === ticketToDelete
            ? { ...ticket, state: "canceled" }
            : ticket,
        );
        setTickets(updatedTickets);
        setAlertMessage("¡Ticket cancelado exitosamente!");
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setAlertMessage(errorData.message || "Error al cancelar el ticket");
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 3000);
      }
    } catch (error) {
      setAlertMessage("Error de conexión. Intenta nuevamente.");
      setShowErrorAlert(true);
      setTimeout(() => setShowErrorAlert(false), 3000);
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
      setTicketToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setTicketToDelete(null);
  };

  if (!localStorage.getItem("token")) {
    return (
      <div className="rc-container">
        <div className="rc-login-message">
          <h2>Acceso requerido</h2>
          <p>Debes iniciar sesión para ver tus reservas de eventos</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rc-container">
        <div className="rc-loading-container">
          <div className="rc-loading-spinner"></div>
          <p>Cargando tus reservas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rc-container">
        <div className="rc-error-container">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const activeTickets = tickets.filter((ticket) => ticket.state !== "canceled");

  return (
    <div className="rc-container">
      {showSuccessAlert && (
        <div className="rc-alert rc-success-alert">
          <span className="rc-alert-icon">✓</span>
          <span>{alertMessage}</span>
          <button
            className="rc-alert-close"
            onClick={() => setShowSuccessAlert(false)}
          >
            ×
          </button>
        </div>
      )}

      {showErrorAlert && (
        <div className="rc-alert rc-error-alert">
          <span className="rc-alert-icon">✗</span>
          <span>{alertMessage}</span>
          <button
            className="rc-alert-close"
            onClick={() => setShowErrorAlert(false)}
          >
            ×
          </button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="rc-modal-overlay">
          <div className="rc-confirm-modal">
            <h3>¿Estás seguro?</h3>
            <p>
              Esta acción cancelará tu reserva. No podrás deshacer esta
              operación.
            </p>
            <div className="rc-modal-buttons">
              <button
                onClick={handleDeleteCancel}
                className="rc-cancel-btn"
                disabled={deleteLoading}
              >
                No, mantener reserva
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="rc-confirm-delete-btn"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <span className="rc-spinner"></span>
                  </>
                ) : (
                  "Sí, cancelar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rc-header">
        <h1>Mis Reservas</h1>
        <p className="rc-tickets-count">
          {activeTickets.length}{" "}
          {activeTickets.length === 1 ? "reserva activa" : "reservas activas"}
        </p>
      </div>

      {activeTickets.length === 0 ? (
        <div className="rc-no-tickets">
          <div className="rc-no-tickets-icon">🎫</div>
          <h2>No tienes reservas activas</h2>
          <p>¡Explora eventos y haz tu primera reserva!</p>
        </div>
      ) : (
        <div className="rc-tickets-grid">
          {tickets.map((ticket: Tickets) => (
            <div
              key={ticket.id}
              className={`rc-ticket-card ${ticket.state === "canceled" ? "rc-canceled" : ""}`}
              style={{
                display: ticket.state === "canceled" ? "none" : "block",
              }}
            >
              <div className="rc-ticket-header">
                <span className={`rc-ticket-state rc-${ticket.state}`}>
                  {ticket.state === "active"
                    ? "Activo"
                    : ticket.state === "pending"
                      ? "Pendiente"
                      : ticket.state === "canceled"
                        ? "Cancelado"
                        : ticket.state}
                </span>
                <span className="rc-ticket-id">Número: #{ticket.id}</span>
              </div>

              <div className="rc-ticket-content">
                <h3 className="rc-ticket-name">
                  {ticket.ticket_type_id % 2 !== 0
                    ? "Campo VIP"
                    : "Campo Común"}
                </h3>
                <p className="rc-ticket-description">
                  {get_eventTitle(ticket.ticket_type_id)}
                </p>

                <div className="rc-ticket-details">
                  <div className="rc-detail-row">
                    <span className="rc-detail-label">Precio:</span>
                    <span className="rc-detail-value rc-price">
                      ${ticket.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rc-ticket-footer">
                <div className="rc-qr-container">
                  <div className="rc-qr-code">
                    <div className="rc-qr-label">Código: {ticket.qr_code}</div>
                  </div>
                  <div className="rc-qr-info">
                    <p className="rc-qr-instructions">
                      Presenta este código en la entrada del evento
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteClick(ticket.id)}
                  className="rc-cancel-ticket-btn"
                  disabled={ticket.state === "canceled"}
                >
                  {ticket.state === "canceled"
                    ? "Cancelado"
                    : "Cancelar Ticket"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
