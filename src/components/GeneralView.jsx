// import { Button } from "@mui/material";
import EventList from "./EventList";
//import Link from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./GeneralView.css";
import { useDbData } from "../utilities/firebase";

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
    "2": {
      "title": "Hello",
      "description": "go jim",
      "location": "blom",
      "meets": "01/20/2024"
    }
  }
};

function generateArrayOfDicts() {
  // my_id = "0"; //this is for testing purposes
  const [events] = useDbData('/events/')
  const keyValPairsArr = users && Object.entries(users)
  // console.log(keyValPairsArr)

  if (keyValPairsArr) {
    const arrayOfDicts = keyValPairsArr.map(([key, user]) => {
      return {
        id: key,
        name: user?.name === undefined ? 'Null' : user.name.toString(),
        gender: user?.gender === undefined ? 'Null' : user.gender.toString(),
        days: user?.days === undefined ? [] : user.days,
        location: user?.location === undefined ? -1 : user.location,
        expertise: user?.expertise === undefined ? -1 : user.expertise,
        sport: user?.sport === undefined ? 'Null' : user.sport,
        funFact: user?.funFact === undefined ? 'Null' : user.funFact,
        preferredName: user?.preferredName === undefined ? '' : user.preferredName
      };
    });

    // Print or use the generated array of dictionaries
    userDB = arrayOfDicts;
  }
}

// export default GeneralView;
const GeneralView = () => {
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

      <button
        className="new"
        variant="contained"
        color={"purple"}
        onClick={() => navigate("/EditEvent")}
      >
        New Event
      </button>

      <EventList events={dummyData.events} />
    </div>
  );
};

export default GeneralView;