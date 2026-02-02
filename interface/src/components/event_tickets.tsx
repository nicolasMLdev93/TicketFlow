import { useState, useEffect } from "react";
import get_eventByTitle from "../connections/get_eventByTitle";
import get_ticketTypesEvent from "../connections/get_ticketTypeByEvent";
import { useParams } from "react-router-dom";
import type { Event, Ticket_type } from "../types/interfaces";
import event_images from "../data/images";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "../styles/event_ticketTypes.css";
import {
  increse_commonCount,
  increse_vipCount,
  decrese_commonCount,
  decrese_vipCount,
  set_eventId,
} from "../cart/slice";
import { useSelector, useDispatch } from "react-redux";

export default function Event_tickets() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { vip_count, common_count, total } = useSelector(
    (state) => state.slice,
  );
  const { title } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [loading_tickets, setloading_tickets] = useState<boolean>(true);
  const [event_result, setEventResult] = useState<Event | null>(null);
  const [event_tickets, setEventTickets] = useState<Ticket_type[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const dispatch = useDispatch();
  const get_eventImg = (id: number) => {
    const image = event_images.find((img) => img.id === id);
    return image ? image.image : "";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatShortDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleBuyClick = (): void => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(set_eventId(event_result?.id));
      navigate("/checkout");
    } else {
      handleOpen();
    }
  };

  const goToLogin = () => {
    handleClose();
    navigate("/login");
  };

  useEffect(() => {
    setLoading(true);
    get_eventByTitle(title)
      .then((res) => {
        if (res) {
          setEventResult(res);
        } else {
          throw new Error("Error getting event by title");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [title]);

  useEffect(() => {
    if (event_result?.id) {
      setloading_tickets(true);
      get_ticketTypesEvent(event_result.id)
        .then((res) => {
          if (res) {
            setEventTickets(res);
          } else {
            throw new Error("Error getting tickets by event");
          }
        })
        .catch((err) => {
          console.log(err);
          setEventTickets([]);
        })
        .finally(() => {
          setloading_tickets(false);
        });
    }
  }, [event_result]);

  if (loading) {
    return (
      <div className="loading-container_tickets">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!event_result) {
    return (
      <div className="error-container">
        <h2>Evento no encontrado</h2>
        <p>El evento que estás buscando no existe o no está disponible.</p>
        <button onClick={() => navigate("/")}>Ir atrás</button>
      </div>
    );
  }

  return (
    <div className="event-tickets-container">
      <div className="event-header">
        <div className="event-image-container">
          <img
            src={get_eventImg(event_result.id)}
            alt={event_result.title}
            className="event-image"
          />
        </div>

        <div className="event-info">
          <div className="event-state-badge">
            {event_result.state === "active" ? "Activo" : "Inactivo"}
          </div>

          <h1 className="event-title">{event_result.title}</h1>

          <div className="event-dates">
            <div className="date-item">
              <span className="date-label">Inicio:</span>
              <span className="date-value">
                {formatDate(event_result.start_date)}
              </span>
            </div>
            <div className="date-item">
              <span className="date-label">Fin:</span>
              <span className="date-value">
                {formatDate(event_result.ending_date)}
              </span>
            </div>
          </div>

          <div className="event-details">
            <div className="detail-item">
              <span className="detail-label">📍</span>
              <span className="detail-value">{event_result.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">👤</span>
              <span className="detail-value">
                Organizado por: {event_result.event_producer}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">👥</span>
              <span className="detail-value">
                Capacidad: {event_result.capacity} personas
              </span>
            </div>
          </div>

          <div className="event-description">
            <h3>Descripción del evento</h3>
            <p>{event_result.description}</p>
          </div>
        </div>
      </div>

      <div className="tickets-section">
        <h2 className="tickets-title">Tickets Disponibles</h2>

        {loading_tickets ? (
          <div className="loading-tickets">
            <div className="loading-spinner small"></div>
          </div>
        ) : event_tickets.length === 0 ? (
          <div className="no-tickets">
            <p>No hay tickets disponibles para este evento en este momento.</p>
          </div>
        ) : (
          <div className="tickets-grid">
            {event_tickets.map((ticket) => {
              return (
                <div key={ticket.id} className={`ticket-card`}>
                  <div className="ticket-header">
                    <h3 className="ticket-name">
                      {ticket.name === "vip" ? "VIP" : "Común"}
                    </h3>
                    <span className="ticket-price">$U {ticket.price}</span>
                  </div>

                  <div className="ticket-body">
                    <span className="status-badge active-badge">
                      DISPONIBLE
                    </span>

                    <div className="ticket-details">
                      <div className="ticket-detail">
                        <span className="detail-label">
                          Cantidad disponible:
                        </span>
                        <span
                          className={`detail-value ${ticket.available_quantity < 10 ? "low-stock" : ""}`}
                        >
                          {ticket.available_quantity}
                        </span>
                      </div>

                      <div className="ticket-detail">
                        <span className="detail-label">Venta hasta:</span>
                        <span className="detail-value">
                          {formatShortDate(ticket.sale_end_date)}
                        </span>
                      </div>
                    </div>
                    <p className="ticket-description">{ticket.description}</p>
                  </div>
                  <div className="ticket-quantity">
                    <button
                      className="quantity-button"
                      onClick={() =>
                        ticket.id % 2 !== 0
                          ? dispatch(decrese_vipCount(ticket.price)) 
                          : dispatch(decrese_commonCount(ticket.price))
                      }
                    >
                      -
                    </button>
                    <span>
                      {ticket.id % 2 !== 0 ? vip_count : common_count}
                    </span>
                    <button
                      className="quantity-button"
                      onClick={() =>
                        ticket.id % 2 !== 0
                          ? dispatch(increse_vipCount(ticket.price))
                          : dispatch(increse_commonCount(ticket.price))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="ticket-footer">
              <span className="buy-price">Total: $U {total}</span>
              <button disabled={total === 0} className="buy-button" onClick={handleBuyClick}>
                COMPRAR AHORA
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-login-title"
        aria-describedby="modal-login-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "450px" },
            maxWidth: "95vw",
            bgcolor: "black",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            p: 3,
            outline: "none",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" sx={{ mr: 1, fontSize: "1.8rem" }}>
              ⚠️
            </Typography>
            <Typography
              id="modal-login-title"
              variant="h5"
              component="h2"
              sx={{ fontWeight: 600, color: "#1a237e" }}
            >
              Acceso Requerido
            </Typography>
          </Box>

          <Typography
            id="modal-login-description"
            sx={{
              mt: 2,
              mb: 3,
              fontSize: "1rem",
              color: "#455a64",
              lineHeight: 1.5,
            }}
          >
            Lo sentimos, debes iniciar sesión para poder comprar tickets.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                px: 3,
                borderRadius: "6px",
                borderColor: "#b0bec5",
                color: "#546e7a",
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={goToLogin}
              sx={{
                px: 3,
                borderRadius: "6px",
                bgcolor: "#1976d2",
                color: "white",
              }}
            >
              Ir a Login
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
