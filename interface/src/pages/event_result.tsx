import { useEffect } from "react";
import Footer from "../components/footer";
import Event_searchResults from "../components/event_searchResults";
import "../styles/event_result.css";

export default function Event_result() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="event-result">
      <Event_searchResults />
      <Footer />
    </div>
  );
}
