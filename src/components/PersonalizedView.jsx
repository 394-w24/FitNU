import React, { useEffect } from 'react'
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross"
import Profile from "./Profile";
import { calculateMatchingAll, nextProfile } from "./ProfileHandler";

const PersonalizedView = () => {
  calculateMatchingAll()
  return <div className="personalized-view">


    <Check />
    <Profile />
    <Cross />

  </div>;
};



export default PersonalizedView;
