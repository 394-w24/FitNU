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

const App = () => {
  const [user] = useAuthState();
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  return (
    <div className="app">
      {user ?
        firstTimeUser ?
          <CreateProfile user={user} firstTimeUserCallBack={setFirstTimeUser} /> :
          <BrowserRouter>
            <Header user={user} />
            <div className="app-content">
              <Router user={user} firstTimeUserCallBack={setFirstTimeUser} />
            </div>
            <Navbar />
          </BrowserRouter>
        : <LoginPage firstTimeUserCallBack={setFirstTimeUser} />}
    </div>
  );
};

export default App;