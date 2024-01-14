import React, { useEffect } from 'react'
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross"
import Profile from "./Profile";
import { calculateMatchingAll, nextProfile } from "./ProfileHandler";

const PersonalizedView = () => {
  console.log("a")
  calculateMatchingAll()
  return (
    <div className="personalized-view">
      <Cross />
      <Profile />
      <Check />
    </div>);
};

export default PersonalizedView;
