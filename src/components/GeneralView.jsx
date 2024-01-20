import { Button } from "@mui/material";
import EventList from "./EventList";
//import Link from "react-router-dom";
import { useNavigate } from "react-router-dom";

const dummyData = {
  // "title": "CS Courses for 2018-2019",
  "events": {
    "0": {
      "title": "Gym",
      "description": "go gym",
      "location": "spac",
      "meets": "01/20/2024"
    },
    "1": {
      "title": "Hello",
      "description": "go jim",
      "location": "blom",
      "meets": "01/20/2024"
    },
    // "2": {
    //   "title": "Hello",
    //   "description": "go jim",
    //   "location": "blom",
    //   "meets": "01/20/2024"
    // }
  }
};

// export default GeneralView;
const GeneralView = () => {
  const imageStyle = {
    width: '300px', // Adjust width as needed
    height: 'auto', // Maintains aspect ratio
    display: 'block', // Needed for margin auto to work
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-100px'
  };

  const navigate = useNavigate();

  const textStyle = {
    textAlign: 'center', // Corrected styling for text alignment
  };

  return (
    <div className="general-view">
      <img
        src="https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/2021/10/20/Picture1.png"
        alt="Description"
        style={imageStyle}
      />
      <h2 style={textStyle}>
        Let's start Swiping!
      </h2>

      <EventList events={dummyData.events} />
      <Button
        variant="contained"
        color={"purple"}
        onClick={() => navigate("/EditEvent")}
      >
        New Event
      </Button>
    </div>
  );
};

export default GeneralView;