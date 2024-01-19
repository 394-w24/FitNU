import React from 'react';
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross";
import Profile from "./Profile";
import useProfileStore from '../utilities/store';
import { matchableCount, calculateMatchingAll, nextProfile } from "./ProfileHandler";

const PersonalizedView = () => {

  const { profile } = useProfileStore();
  calculateMatchingAll()
  return (
    <div className="personalized-view">
      {profile !== null ? (
        <div className="personalized-core">
          <Cross />
          <Profile />
          <Check />
        </div>
      )
        :
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