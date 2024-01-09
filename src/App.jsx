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

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app-content">
          <div className="personal">
            <Cross />
            <Profile />
            <Check />
          </div>
          <Router />
        </div>
        <Navbar />
      </BrowserRouter>
    </div>
  );
};

export default App;