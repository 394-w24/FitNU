import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Router />
        <Navbar />
      </BrowserRouter>
    </div>
  );
};

export default App;
