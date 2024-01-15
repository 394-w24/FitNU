import "./Header.css";
import { signOut } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <button style={{ width: "50px", height: "50px" }} onClick={() => {
        signOut();
        navigate("/");
      }} >Sign Out</button>
      <h1>FitNU</h1>
      <img src={user.photoURL} onClick={() => navigate('/EditProfile')} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default Header;
