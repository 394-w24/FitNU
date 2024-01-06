import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonalizedView from "./components/PersonalizedView";
import GeneralView from "./components/GeneralView";
import Chat from "./components/Chat";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PersonalizedView />} />
        <Route path="/PersonalizedView" element={<PersonalizedView />} />
        <Route path="/GeneralView" element={<GeneralView />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
