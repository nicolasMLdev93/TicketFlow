import { useEffect } from "react";
import "../styles/home.css";
import Search_bar from "../components/search_bar";
import Events_comp from "../components/events_comp";
import Footer from "../components/footer";

export default function Home() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className="home">
      <Search_bar />
      <Events_comp />
      <Footer/>
    </div>
  );
}
