import { Routes, Route } from "react-router-dom";
import PersonalizedView from "./components/PersonalizedView";
import GeneralView from "./components/GeneralView";
import Chat from "./components/Chat";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonalizedView />} />
      <Route path="/PersonalizedView" element={<PersonalizedView />} />
      <Route path="/GeneralView" element={<GeneralView />} />
      <Route path="/Chat" element={<Chat />} />
    </Routes>
  );
};

export default Router;
