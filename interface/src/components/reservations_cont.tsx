import "../styles/reservations_cont.css";

export default function Reservations_cont() {
  return (
    <div className="reservations_cont">
      {localStorage.getItem("token") ? (
        <section>contenido ..</section>
      ) : (
        <section>Debes logearte para ver tus reservas a eventos</section>
      )}
    </div>
  );
}
