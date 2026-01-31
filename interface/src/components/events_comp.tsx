import { useState, useEffect } from "react";
import get_allEvents from "../connections/get_allEvents";
import type { Event } from "../types/interfaces";
import "../styles/events_comp.css";
import event_images from "../data/images";
import { useNavigate } from "react-router-dom";

export default function Events_comp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [events, setevents] = useState<Event[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const navigate = useNavigate();

  const get_eventImg = (id: number) => {
    const image = event_images.find((img) => img.id === id);
    return image ? image.image : "";
  };

  useEffect(() => {
    setloading(true);
    get_allEvents()
      .then((res) => {
        if (res) {
          setevents(res);
        } else {
          throw new Error("Error getting all events");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

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

  return (
    <div className="events-container">
      <header className="events-header">
        <h1 className="events-title">Próximos Eventos</h1>
        <p className="events-subtitle">
          Descubre y participa en los mejores eventos del Uruguay
        </p>
      </header>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="no-events">
          <h3>No hay eventos disponibles</h3>
          <p>Pronto se agregarán nuevos eventos. ¡Vuelve a revisar!</p>
        </div>
      ) : (
        <>
          <div className="events-stats">
            <div className="stat-card">
              <span className="stat-number">{events.length}</span>
              <span className="stat-label">Eventos activos</span>
            </div>
            <div className="stat-card">
              <span style={{ color: "red" }} className="stat-number">
                Santander
              </span>
              <span className="stat-label">Consigue cupón de descuento</span>
            </div>
          </div>

          <div className="events-grid">
            {events.map((event: Event) => (
              <div
                key={event.id}
                className={`event-card ${event.state === "active" ? "active" : "inactive"}`}
              >
                <div className="event-card-header">
                  <div className="event-image-container">
                    <img
                      src={get_eventImg(event.id)}
                      alt={event.title}
                      className="event-image"
                    />
                  </div>
                  <span className={`event-status ${event.state}`}>
                    {event.state === "active" ? "Activo" : "Inactivo"}
                  </span>
                </div>

                <div className="event-card-body">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>

                  <div className="event-details">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <div className="detail-content">
                        <span className="detail-label">Fecha de inicio:</span>
                        <span className="detail-value">
                          {formatDate(event.start_date)}
                        </span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <div className="detail-content">
                        <span className="detail-label">Ubicación:</span>
                        <span className="detail-value">{event.location}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <span className="detail-icon">👥</span>
                      <div className="detail-content">
                        <span className="detail-label">Capacidad:</span>
                        <span className="detail-value">
                          {event.capacity.toLocaleString()} personas
                        </span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <span className="detail-icon">🏢</span>
                      <div className="detail-content">
                        <span className="detail-label">Organizador:</span>
                        <span className="detail-value">
                          {event.event_producer}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="event-card-footer">
                  <button
                    onClick={() => navigate(`event/${event.title}`)}
                    className="btn-secondary"
                  >
                    Reservar lugar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
