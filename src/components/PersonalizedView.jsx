import React from 'react';
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross";
import Profile from "./Profile";

const PersonalizedView = () => {
  return (
    <div className="personalized-view">
      <Cross />
      <Profile />
      <Check />
    </div>
  );
};

export default PersonalizedView;