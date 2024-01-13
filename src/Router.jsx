import { Routes, Route } from "react-router-dom";
import PersonalizedView from "./components/PersonalizedView";
import GeneralView from "./components/GeneralView";
import Chat from "./components/Chat";
import PageNotFound from "./components/PageNotFound";
import LoginPage from "./components/LoginPage";


const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<PersonalizedView />} />
      <Route path="/PersonalizedView" element={<PersonalizedView />} />
      <Route path="/GeneralView" element={<GeneralView />} />
      <Route path="/Chat" element={<Chat />} />
      <Route path="/LoginPage" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
