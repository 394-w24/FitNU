import React from 'react';
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross";
import Profile from "./Profile";
import { calculateMatchingAll } from "./ProfileHandler";

const PersonalizedView = () => {
  calculateMatchingAll()
  return (
    <div className="personalized-view">
      <Cross />
      <Profile />
      <Check />
    </div>
  );
};

export default PersonalizedView;