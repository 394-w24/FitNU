import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Check from "./components/Check";
import Cross from "./components/Cross";
import ProfilePage from "./components/ProfilePage";
import UserProvider from './components/UserContext';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app-content">
          <div className="personal">
            <Check />
            {/* profile image here */}
            <ProfilePage />
            <Cross />
          </div>
          <Router />
        </div>
        <Navbar />
      </BrowserRouter>
    </div>
  );
};

export default App;