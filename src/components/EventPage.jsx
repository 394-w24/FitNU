import EventList from "./EventList";
import { useNavigate } from "react-router-dom";
import "./EventPage.css";
import EventInterested from "./EventInterested.jsx";
import { useState } from 'react';

import { useDbUpdate, useDbRead } from '../utilities/firebase';



const EventPage = ({ events, favorites }) => {
    const imageStyle = {
        width: '300px', // Adjust width as needed
        height: 'auto', // Maintains aspect ratio
        display: 'block', // Needed for margin auto to work
        marginLeft: 'auto',
        marginRight: 'auto',
        // marginTop: '-100px'
        marginTop: '500px'
    };

    const navigate = useNavigate();

    const textStyle = {
        textAlign: 'center', // Corrected styling for text alignment
    };


    // for liking/marking events as interested, pulled up state from EventList.jsx

    const [selected, setSelected] = useState(favorites);
    console.log("selected: ", selected);
    const toggleSelected = (item) => setSelected(
        selected.includes(item)
            ? selected.filter(x => x !== item)
            : [...selected, item]
    );

    return (
        <div className="event-page">

            <EventList events={events} selected={selected} toggleSelected={toggleSelected} />

            <button
                className="new"
                variant="contained"
                color={"purple"}
                onClick={() => navigate("/EditEvent")}
            >
                New Event
            </button>

            <EventInterested selected={selected} />




        </div>
    );
};

export default EventPage;