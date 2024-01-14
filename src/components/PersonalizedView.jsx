import React, { useEffect } from 'react'
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross"
import Profile from "./Profile";
import { calculateMatchingAll, nextProfile } from "./ProfileHandler";
import CreateProfile from "./CreateProfile";
import { useAuthState } from "../utilities/firebase";

const PersonalizedView = () => {
  const [user] = useAuthState();
  calculateMatchingAll()
  return (
    <div className="personalized-view">
      {/* conditional: if can find user unique id in database, display the matching page */}
      {user ?
        <div>
          <Cross />
          <Profile />
          <Check />
        </div>
        : <CreateProfile user={user} />}

    </div>);
};

export default PersonalizedView;
