import "../styles/checkout.css";
import Footer from "../components/footer";
import Chechout_cont from "../components/chechout_cont";
import { useEffect } from "react";

export default function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="checkout">
      <Chechout_cont />
      <Footer />
    </div>
  );
}
