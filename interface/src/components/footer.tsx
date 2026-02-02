import "../styles/footer.css";
import app_icon from "../icons/ticket_flow_icon.png";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img 
              style={{width:'30px', paddingRight:'10px'}} 
              src={app_icon} 
              alt="app_icon" 
            />
            <span className="logo-text">ticketFlow</span>
          </div>
          <p className="footer-description">
            La plataforma líder para descubrir y gestionar eventos en Uruguay
          </p>
        </div>

        <div className="footer-section">
          <ul className="footer-links">
            <li><a href="/">Eventos</a></li>
            <li><a href="/reservations">Mis Reservas</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Síguenos</h4>
          <div className="social-icons">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © 2026 ticketFlow. Todos los derechos reservados.
        </div>
        <div className="footer-links-bottom">
          <a >Términos y Condiciones</a>
          <a >Política de Privacidad</a>
          <a >Política de Cookies</a>
        </div>
      </div>
    </footer>
  );
}