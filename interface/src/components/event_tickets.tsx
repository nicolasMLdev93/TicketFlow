import { useState, useEffect } from "react";
import get_eventByTitle from "../connections/get_eventByTitle";
import get_ticketTypesEvent from "../connections/get_ticketTypeByEvent";
import { useParams } from "react-router-dom";
import type { Event, Ticket_type } from "../types/interfaces";
import event_images from "../data/images";
import "../styles/event_ticketTypes.css";

export default function Event_tickets() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { title } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [loading_tickets, setloading_tickets] = useState<boolean>(true);
  const [event_result, setEventResult] = useState<Event | null>(null);
  const [event_tickets, setEventTickets] = useState<Ticket_type[]>([]);

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

  useEffect(() => {
    setLoading(true);
    get_eventByTitle(title)
      .then((res) => {
        if (res) {
          console.log(res);
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

                  <div className="ticket-footer">
                    <button className="buy-button">COMPRAR AHORA</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
