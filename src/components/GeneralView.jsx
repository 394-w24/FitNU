// import { Button } from "@mui/material";
//import Link from "react-router-dom";
import "./GeneralView.css";
import { getEvents } from "./EventHandler.jsx";
import EventPage from "./EventPage";

// export default GeneralView;
const GeneralView = () => {
  const events = getEvents();
  console.log(events);

  return (
    <div className="general-view">
      <EventPage events={events} />
    </div>
  );
};

export default GeneralView;