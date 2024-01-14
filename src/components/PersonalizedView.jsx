import React, { useEffect, useState } from 'react';
import "./PersonalizedView.css";
import Check from "./Check";
import Cross from "./Cross";
import Profile from "./Profile";
import CreateProfile from "./CreateProfile";
import { useAuthState, useDbData } from "../utilities/firebase";

const PersonalizedView = () => {
  const [user] = useAuthState();
  const userId = user ? user : null; // Or however you get the user's ID
  const [userData, error] = userId ? useDbData(`users/${userId}`) : [null, null];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData || error) {
      setIsLoading(false);
    }
  }, [userData, error]);

  if (!user || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="personalized-view">
      {userData ?
        <div>
          <Cross />
          <Profile />
          <Check />
        </div>
        : <CreateProfile user={user} />
      }
    </div>
  );
};

export default PersonalizedView;
