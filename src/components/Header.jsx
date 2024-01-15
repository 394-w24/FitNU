import "./Header.css";
import { signOut } from "../utilities/firebase";


const Header = ({ user }) => {
  return (
    <div className="header">
      <button style={{ width: "50px", height: "50px" }} onClick={() => signOut()} >Sign Out</button>
      <h1>FitNU</h1>
      <img src={user.photoURL} />
    </div>
  );
};

export default Header;
