import React, { useEffect, useState } from 'react';
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross";
import Profile from "./Profile";
import CreateProfile from "./CreateProfile";
import { useAuthState, useDbData } from "../utilities/firebase";

const PersonalizedView = () => {
  const [user] = useAuthState();
  const [userData, loading, error] = useDbData(user ? `users/${user.uid}` : null);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (userData) {
        setHasProfile(true);
      } else if (error) {
        // Handle the error appropriately
        console.error(error);
      }
    }
  }, [userData, loading, error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not authenticated</div>;
  }

  return (
    <div className="personalized-view">
      {hasProfile ? (
        <div>
          <Cross />
          <Profile profileData={userData} />
          <Check />
        </div>
      ) : (
        <CreateProfile user={user} />
      )}
    </div>
  );
};

export default PersonalizedView;