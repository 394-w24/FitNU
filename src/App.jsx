import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app-content">
          <Router />
        </div>
        <Navbar />
      </BrowserRouter>
    </div>
  );
};

export default App;
