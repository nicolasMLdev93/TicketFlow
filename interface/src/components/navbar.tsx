import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import app_icon from "../icons/ticket_flow_icon.png";
import Person4Icon from "@mui/icons-material/Person4";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const handleHomeNavigation = () => {
    navigate("/");
  };

  const handleLoginNavigation = () => {
    navigate("login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        className="blur-navbar"
        sx={{ boxShadow: "none" }}
      >
        <Toolbar>
          <div
            onClick={handleHomeNavigation}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img
              src={app_icon}
              alt="ticketflow_icon"
              className="app_icon"
              style={{ cursor: "pointer" }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              ticketFlow
            </Typography>
          </div>

          <Box sx={{ flexGrow: 1 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Person4Icon />
            <button onClick={handleLoginNavigation} className="login_btn">
              Ingresar
            </button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
