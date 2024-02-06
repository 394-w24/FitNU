import EventList from "./EventList";
import { useNavigate } from "react-router-dom";
import "./EventPage.css";
import EventInterested from "./EventInterested.jsx";
import { useState } from 'react';

const EventPage = ({ events }) => {
    const imageStyle = {
        width: '300px', // Adjust width as needed
        height: 'auto', // Maintains aspect ratio
        display: 'block', // Needed for margin auto to work
        marginLeft: 'auto',
        marginRight: 'auto',
        // marginTop: '-100px'
        marginTop: '70px'
    };

    const navigate = useNavigate();

    const textStyle = {
        textAlign: 'center', // Corrected styling for text alignment
    };

    // for liking/marking events as interested, pulled up state from EventList.jsx
    const [selected, setSelected] = useState([]);
    const toggleSelected = (item) => setSelected(
        selected.includes(item)
            ? selected.filter(x => x !== item)
            : [...selected, item]
    );

    return (
        <div className="event-page">
            <img
                src="https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/2021/10/20/Picture1.png"
                alt="Description"
                style={imageStyle}
            />
            <h2 style={textStyle}>
                Let's start Swiping!
            </h2>

            <button
                className="new"
                variant="contained"
                color={"purple"}
                onClick={() => navigate("/EditEvent")}
            >
                New Event
            </button>

            <EventInterested selected={selected} />

            <EventList events={events} selected={selected} toggleSelected={toggleSelected} />
        </div>
    );
};

export default EventPage;