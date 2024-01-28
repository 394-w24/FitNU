import "./Check.css";
import { calculateMatchingAll, getUserName, nextProfile, saveLast } from "./ProfileHandler";

const Check = () => {
  calculateMatchingAll()
  return (
    <div className="matchButton">
      <button onClick={handleMatchClick} className="match-button">
        <img src="/checkmark.png" alt="Checkmark" className="icon" />
      </button>
    </div>
  );
};

function handleMatchClick() {


  let usr = getUserName();

  saveLast();
  alert("You sent a message to " + usr + "!");

  nextProfile();
};




export default Check;
