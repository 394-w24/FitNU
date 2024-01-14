import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuthState } from "./utilities/firebase";
import LoginPage from "./components/LoginPage";
import { useState } from "react";
import CreateProfile from "./components/CreateProfile";
import { signOut } from "./utilities/firebase";

const App = () => {
  const [user] = useAuthState();
  const [firstTimeUser, setFirstTimeUser] = useState(false);
  console.log('user:', user);

  return (
    <div className="app">
      {user ?
        firstTimeUser ?
          <CreateProfile firstTimeUserCallBack={setFirstTimeUser} /> :
          <BrowserRouter>
            <Header />
            <div className="app-content">
              <Router />
            </div>
            <button style={{ width: "50px", height: "50px" }} onClick={() => signOut()} >Sign Out</button>
            <Navbar />
          </BrowserRouter>
        : <LoginPage firstTimeUserCallBack={setFirstTimeUser} />}
    </div>
  );
};

export default App;