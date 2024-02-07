// import { Button } from "@mui/material";
//import Link from "react-router-dom";
import "./GeneralView.css";
import { getEvents } from "./EventHandler.jsx";
import EventPage from "./EventPage";
import { useDbData } from "../utilities/firebase";
import React from "react";

// export default GeneralView;
const GeneralView = ({ user, events }) => {
  //console.log("this is the general view now");
  //console.log("user:", user.uid, typeof (user.uid));



  //${user.uid}

  const [favorites, error] = useDbData(`/favorites/${user.uid}`);

  //

  //console.log(favoritesList);

  if (error) return <h1>error loading favorites</h1>
  if (error === undefined) return <h1>loading...</h1>
  if (!favorites) {
    return (
      <div className="general-view">
        <EventPage events={events} favorites={[]} user={user} />
      </div>
    );
  }

  // Assuming each event in `events` has a unique `id` property
  console.log("Favorites before split:", favorites, typeof favorites);
  const favoritesString = favorites || '';
  const favoritesList = favoritesString.split(",").map(id => id.trim());
  const favoritesEvents = favoritesList.map(id => [events[id], id]);
  console.log("Favorites IDs:", favoritesList);
  console.log("Favorite Events: ", favoritesEvents);

  return (
    <div className="general-view">
      <EventPage events={events} favorites={favoritesEvents} user={user} />
    </div>
  );
};

export default GeneralView;