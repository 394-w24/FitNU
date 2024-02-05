// import { Button } from "@mui/material";
//import Link from "react-router-dom";
import "./GeneralView.css";
import { getEvents } from "./EventHandler.jsx";
import EventPage from "./EventPage";
import { useDbData } from "../utilities/firebase";
import React from "react";

// export default GeneralView;
const GeneralView = ({ user }) => {
  //console.log("this is the general view now");
  //console.log("user:", user.uid, typeof (user.uid));
  const events = getEvents();


  //${user.uid}

  const [favorites, error] = useDbData(`/favorites/${user.uid}`);

  //

  //console.log(favoritesList);

  if (error) return <h1>error loading favorites</h1>
  if (error === undefined) return <h1>loading...</h1>
  if (!favorites) return <h1>no favorites found</h1>


  //console.log("favorites: ", favorites);
  const favoritesIdList = favorites.split(",").map(id => id.trim());
  //console.log("Event keys:", Object.keys(events));
  //console.log("Favorites IDs:", favoritesIdList);


  //console.log("events: ", events);

  //console.log("test: ", events["7EwdbFQJkRUOj6OnnrKrxsPqdBG2"]);

  const favoritesList = favoritesIdList.map(id => events[id]);
  //console.log("favorites list objects: ", favoritesList);

  return (
    <div className="general-view">
      <EventPage events={events} favorites={favoritesList} />
    </div>
  );
};

export default GeneralView;