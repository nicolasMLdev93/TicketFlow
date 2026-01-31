import Footer from "../components/footer";
import Event_tickets from "../components/event_tickets";
import { useEffect } from "react";
import "../styles/event_tickets.css";

export default function Event() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  return (
    <div className="event_tickets">
      <Event_tickets />
      <Footer />
    </div>
  );
}
