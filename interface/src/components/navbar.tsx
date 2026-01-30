import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import app_icon from "../icons/ticket_flow_icon.png";
import Person4Icon from "@mui/icons-material/Person4";
import "../styles/navbar.css";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        className="blur-navbar"
        sx={{ boxShadow: "none" }}
      >
        <Toolbar>
          <img src={app_icon} alt="ticketflow_icon" className="app_icon" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ticketFlow
          </Typography>
          <Person4Icon />
          <button className="login_btn">Ingresar</button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
