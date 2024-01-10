import React, { useEffect } from 'react'
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross"
import { calculateMatchingAll, nextProfile } from "./ProfileHandler";

const PersonalizedView = () => {
  calculateMatchingAll()
  return <div className="personalized-view">


    <Check />
    {/* profile image here */}
    <Cross />

  </div>;
};



export default PersonalizedView;
