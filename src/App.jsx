import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Check from "./components/Check";
import Cross from "./components/Cross";
import Profile from "./components/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import UserProvider from './components/UserContext';
import { useAuthState } from "./utilities/firebase";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [user] = useAuthState();
  console.log("user:", user);

  return (
    <div className="app">
      {user ?
        <BrowserRouter>
          <Header />
          <div className="app-content">
            <Router />
          </div>
          <Navbar />
        </BrowserRouter>
        : <LoginPage />}
    </div>
  );
};

export default App;