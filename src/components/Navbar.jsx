import React from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine if the path matches the current location
  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar">
      <Button
        variant="contained"
        color={isActive("/GeneralView") ? "success" : "primary"}
        onClick={() => navigate("/GeneralView")}
      >
        Events
      </Button>
      <Button
        variant="contained"
        color={
          isActive("/PersonalizedView") | isActive("/") ? "success" : "primary"
        }
        onClick={() => navigate("/PersonalizedView")}
      >
        My Matching
      </Button>
      <Button
        variant="contained"
        color={isActive("/Chat") ? "success" : "primary"}
        onClick={() => navigate("/Chat")}
      >
        Chat
      </Button>
    </div>
  );
};

export default Navbar;
