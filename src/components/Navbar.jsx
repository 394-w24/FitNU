import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate("/GeneralView")}
      >
        General
      </Button>
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate("/PersonalizedView")}
      >
        Personalized
      </Button>
    </div>
  );
};

export default Navbar;
