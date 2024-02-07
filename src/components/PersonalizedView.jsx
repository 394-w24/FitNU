import React from 'react';
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross";
import Profile from "./Profile";
import useProfileStore from '../utilities/store';
import { getUID, matchableCount, calculateMatchingAll, nextProfile } from "./ProfileHandler";

const PersonalizedView = ({ user }) => {
  const { profile } = useProfileStore();
  const uid = getUID();
  calculateMatchingAll()
  return (
    <div className="personalized-view">
      {profile !== null ? (
        <div className="personalized-core">
          <Cross user={user} />
          <Profile />
          <Check user={user} />
        </div>
      ) : matchableCount(uid) < 1 ? (
        <p>No available matches right now, please try again later</p>
      ) :
        <div className="refresh">
          <p>Please press the refresh button to start from the beginning of the list</p>
          <button onClick={nextProfile} className="ref-button">
            <p className="ref-ico">🔄</p>
          </button>
        </div>
      }
    </div>
  );
};

export default PersonalizedView;
