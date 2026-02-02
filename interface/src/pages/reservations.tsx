import Footer from "../components/footer";
import Reservations_cont from "../components/reservations_cont";
import { useEffect } from "react";
import "../styles/reservations.css";

export default function Reservations() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="reservations">
      <Reservations_cont />
      <Footer />
    </div>
  );
}
