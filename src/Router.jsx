import { Routes, Route } from "react-router-dom";
import PersonalizedView from "./components/PersonalizedView";
import GeneralView from "./components/GeneralView";
import Chat from "./components/Chat";
import ChatContent from "./components/ChatContent";
import PageNotFound from "./components/PageNotFound";
import CreateProfile from "./components/CreateProfile";
import { useDbData } from "./utilities/firebase";
import CreateEvent from "./components/CreateEvent";

const Router = ({ user, firstTimeUserCallBack }) => {
  const [userData, userDataError] = useDbData(`/users/${user.uid}`);
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<PersonalizedView user={user} />} />
      <Route path="/PersonalizedView" element={<PersonalizedView user={user} />} />
      <Route path="/GeneralView" element={<GeneralView />} />
      <Route path="/Chat" element={<Chat user={user} />} />
      <Route path="/EditProfile" element={<CreateProfile user={user} userData={userData} firstTimeUserCallBack={firstTimeUserCallBack} />} />
      <Route path="/Chat/:chatId" element={<ChatContent user={user} />} />
      <Route path="/EditEvent" element={<CreateEvent user={user} />} />
    </Routes>
  );
};

export default Router;
