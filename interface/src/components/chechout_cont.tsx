import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { OrderData } from "../types/interfaces";
import "../styles/checkout_cont.css";
import { set_initialStates } from "../cart/slice";

export default function Checkout() {
  const navigate = useNavigate();
  const { vip_count, common_count, total, event_id } = useSelector(
    (state) => state.slice,
  );
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || total === 0) {
      navigate("/");
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData: OrderData = {
        user_id: Number(localStorage.getItem("user_id")),
        total: total,
        vip_count: vip_count,
        common_count: common_count,
        event_id: event_id,
      };

      const response = await fetch("http://localhost:3000/create_order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setModalMessage(
          `¡Compra realizada con éxito!
          
          Total (con impuestos): $${(total + total * 0.01).toFixed(2)}
          Entradas VIP: ${vip_count}
          Entradas Comunes: ${common_count}
          
          Tickets en la sección de usuario de tu cuenta`,
        );
        setModalType("success");
        setShowModal(true);
        dispatch(set_initialStates())
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setModalMessage(
          "Error al procesar la compra. Por favor, intenta nuevamente.",
        );
        setModalType("error");
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage("Error de conexión. Por favor, verifica tu conexión.");
      setModalType("error");
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <>
      <div className="checkout-container">
        <h2 className="checkout-title">Finalizar Compra</h2>

        <div className="order-summary">
          <h3>Resumen de la Orden</h3>
          <div className="summary-details">
            <p>
              <span>Entradas VIP:</span> {vip_count}
            </p>
            <p>
              <span>Entradas Comunes:</span> {common_count}
            </p>
            <p>
              <span>Impuestos (0.01 %):</span>$U {total * 0.01}
            </p>
            <p className="total">
              <span>Total:</span> ${(total + total * 0.01).toFixed(2)}
            </p>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Información de Pago</h3>

          <div className="form-group">
            <label>Nombre del Titular</label>
            <input type="text" value="Juan" readOnly className="demo-field" />
          </div>

          <div className="form-group">
            <label>Apellido del Titular</label>
            <input type="text" value="Pérez" readOnly className="demo-field" />
          </div>

          <div className="form-group">
            <label>Número de Tarjeta</label>
            <input
              type="text"
              value="1234 5678 9012 3456"
              readOnly
              className="demo-field"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha de Expiración</label>
              <input
                type="text"
                value="12/28"
                readOnly
                className="demo-field"
              />
            </div>

            <div className="form-group">
              <label>CVC</label>
              <input type="text" value="123" readOnly className="demo-field" />
            </div>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || total === 0}
          >
            {isSubmitting ? "Procesando..." : `Pagar $${total.toFixed(2)}`}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <div className={`modal-icon ${modalType}`}>
                {modalType === "success" ? "✓" : "!"}
              </div>
              <p className="modal-message">{modalMessage}</p>

              <div className="modal-actions">
                <button className="modal-btn" onClick={closeModal}>
                  {modalType === "success" ? "Continuar" : "Reintentar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
