import { Routes, Route } from "react-router-dom";
import PersonalizedView from "./components/PersonalizedView";
import GeneralView from "./components/GeneralView";
import Chat from "./components/Chat";
import ChatContent from "./components/ChatContent";
import PageNotFound from "./components/PageNotFound";
import CreateProfile from "./components/CreateProfile";

const Router = ({ user, firstTimeUserCallBack }) => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<PersonalizedView user={user} />} />
      <Route path="/PersonalizedView" element={<PersonalizedView user={user} />} />
      <Route path="/GeneralView" element={<GeneralView />} />
      <Route path="/Chat" element={<Chat user={user} />} />
      <Route path="/EditProfile" element={<CreateProfile user={user} firstTimeUserCallBack={firstTimeUserCallBack} />} />
      <Route path="/Chat/:chatId" element={<ChatContent user={user} />} />
    </Routes>
  );
};

export default Router;
