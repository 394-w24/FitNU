import "./Header.css";
import { signOut } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDbData } from "../utilities/firebase";


const Header = ({ user, profile }) => {
  const navigate = useNavigate();


  const [photoURL] = useDbData(`users/${user.uid}/photoURL`)


  return (
    <div className="header">
      <Button color='error' variant="contained" style={{ width: "50px", height: "50px" }} onClick={() => {
        signOut();
        navigate("/");
      }} >Sign Out</Button>
      <h1>FitNU</h1>

      <img src={photoURL} onClick={() => navigate('/EditProfile')} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default Header;
