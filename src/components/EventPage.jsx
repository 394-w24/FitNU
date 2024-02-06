import EventList from "./EventList";
import { useNavigate } from "react-router-dom";
import "./EventPage.css";
import EventInterested from "./EventInterested.jsx";
import { useState } from 'react';

import { useDbUpdate, useDbRead } from '../utilities/firebase';
import { useEffect } from "react";



const EventPage = ({ events, favorites, user }) => {
    // Assuming each event in `events` has a unique `id` property
    console.log("Favorites before split:", favorites, typeof favorites);
    const favoritesString = favorites || '';
    const favoritesList = favoritesString.split(",").map(id => id.trim());
    const favoritesEvents = favoritesList.map(id => [events[id], id]);

    console.log("Events: ", events);
    console.log("Event keys:", Object.keys(events));
    console.log("Favorites IDs:", favoritesList);
    console.log("Favorite Events: ", favoritesEvents);

    const [selected, setSelected] = useState(favoritesEvents);
    const [updateFavorites, updateResult] = useDbUpdate();

    const toggleSelected = (item, index) => {
        console.log("toggle selected:");
        console.log("selencted: ", selected);
        console.log("item: ", item);
        console.log("Comparing IDs", selected.map(([event, index]) => event.id), item.id);
        const isSelected = selected.some(([event, index]) => event.id === item.id);
        console.log("isselected: ", isSelected);
        const newSelected = isSelected
            ? selected.filter(([event, index]) => event.id !== item.id)
            : [...selected, [item, index]];
        setSelected(newSelected);

        console.log("new selected: ", newSelected);

        const newFavoritesString = newSelected.map(([event, index]) => index).join(',');
        console.log("new favorites string: ", newFavoritesString);
        updateFavoritesInDb(newFavoritesString);
    };

    const updateFavoritesInDb = (favoritesString) => {
        const path = `/favorites/`;
        const value = { [user.uid]: favoritesString }; // Creating an object with the value to update

        updateFavorites(path, value)
            .then(() => console.log("Favorites updated successfully"))
            .catch(error => console.error("Error updating favorites:", error));
    };



    useEffect(() => {
        if (updateResult) {
            if (updateResult.error) {
                console.error(updateResult.error);
            } else {
                console.log("Favorites updated successfully");
            }
        }
    }, [updateResult]);

    const navigate = useNavigate();

    if (updateResult?.error) return <div>Error updating favorites</div>;

    return (
        <div className="event-page">
            <EventList events={events} selected={selected} toggleSelected={toggleSelected} />
            <button className="new" onClick={() => navigate("/EditEvent")}>New Event</button>
            <EventInterested selected={selected} />
        </div>
    );
};

export default EventPage;