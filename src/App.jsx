import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuthState } from "./utilities/firebase";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [user] = useAuthState();

  return (
    <div className="app">
      {user ?
        <BrowserRouter>
          <Header />
          <div className="app-content">
            <Router />
          </div>
          <Navbar />
        </BrowserRouter> : <LoginPage />}
    </div>
  );
};

export default App;